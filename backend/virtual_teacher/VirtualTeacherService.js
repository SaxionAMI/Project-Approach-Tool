const mongoose = require("mongoose");
const VTEngineWorkspaceScope = require("./engine/scopes/vt-engine-workspace-scope");
const VTFeedbackGenerator = require("./engine/VTFeedbackGenerator");
const VTRule = require("./rules/vt-rule");
const MongoVtRule = mongoose.model("VtRule");
const MongoWorkspace = mongoose.model("Workspace");

/**
The VirtualTeacherService acts as a single "instance" of a virtual teacher.
Each instance is associated with a specific workspace / room and only responds
to changes in the associated workspace / room.
*/
module.exports = class VirtualTeacherService {
    /**
     * Creates a new virtual teacher instance. Expects two parameters, both of which can be received from the socketModule's 'joinWorkspace' event:
     * @param workspace (Object): the room / workspace that this VT instance will generate feedback for.
     * */
    constructor(workspace) {
        this._workspace = workspace;
        this._feedbackMode = 'creating';
        this._isRunning = false;
        this._workspaceChanged = false;
        this._workspaceUpdatedFromApi = 0;
        this._startAnalysisTimeout = undefined;
        this._lastWorkspaceUpdate = new Date(Date.now());
        this._isDoingAnalysis = false;
        this._isManuallyDisabled = false;
        this._isPermanentlyDisabled = false;
        this._disabledRuleIds = [];

        //Bind own functions to self. This is necessary because socket.io overrides 
        //the context of 'this' within socket event handlers.
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.setFeedbackMode = this.setFeedbackMode.bind(this);
        this.cardChanged = this.cardChanged.bind(this);
        this.groupChanged = this.groupChanged.bind(this);
        this.manualTrigger = this.manualTrigger.bind(this);
        this.setRuleEnabled = this.setRuleEnabled.bind(this);
        
        //Initialize socket connection
        this._workspace.emitter.on('enableVirtualTeacher', this.start);
        this._workspace.emitter.on('disableVirtualTeacher',this.stop);
        this._workspace.emitter.on('setRuleEnabled',this.setRuleEnabled);

        MongoWorkspace.findById(this._workspace.id).then(x => {
            this._isManuallyDisabled = x.permanentDisableVT;
            this._isPermanentlyDisabled = x.permanentDisableVT;
            this._disabledRuleIds = x.disabledRuleIds;
            this._workspace.emit('setRuleEnabled', x.disabledRuleIds);
            this._workspace.emit('virtualTeacherReady', {
                disabled: !this._isRunning,
                autostart: !this._isManuallyDisabled
            });   
        });
        
    };

    newUserConnected(socketId) {
        console.log('welcome new user: ' + socketId);
        this._workspace.emitTo(socketId, 'virtualTeacherReady', {
            disabled: !this._isRunning,
            autostart: !this._isManuallyDisabled && !this._isPermanentlyDisabled
        })
    }

    /**
     * Indicates if this virtual teacher is enabled.
     */
    get isRunning() {
        return this._isRunning;
    }

    /**
     * The socket room that this virtual teacher is bound to.
     */
    get workspace() {
        return this._workspace;
    };

    /**
     * Start the virtual teacher feedback analysis. Only succeeds if the current 
     * workspace data and most recently made edit are known & up-to-date.
     */
    startAnalysis(scope, workspaceData) {
        if (!this._isRunning) return;
        if (this._isDoingAnalysis) return;
        if (!workspaceData || !scope) return;

        const disabledRuleIds = this._disabledRuleIds == null ? [] : this._disabledRuleIds;
        const rules = this._rules == null ? [] : this._rules.filter(x => disabledRuleIds.findIndex(y => y == x.id) < 0);

        this._isDoingAnalysis = true;
        const feedback = new VTFeedbackGenerator(this._feedbackMode).generateFeedback(workspaceData, rules, scope);
        console.log(feedback);
        this.workspace.emit('feedbackReady', feedback);

        this._pendingAnalysisScope = null;
        this._workspaceData = null;
        this._isDoingAnalysis = false;
    }

    /**Starts this virtual teacher instance. Does not affect the current mode of feedback.*/
    start([workspace, forceEnabled]) {
        if (this._isPermanentlyDisabled && !forceEnabled) return;
        if (this._isRunning) return;

        this._isRunning = true;
        this._isManuallyDisabled = false;
        this._isPermanentlyDisabled = false;

        //initialize rules
        MongoVtRule.find({enabled: true}).then(rules => {
            this._rules = rules.map(x => VTRule.fromDbRule(x)).filter(x => x != null);

            if (workspace) {
                const scope = VTEngineWorkspaceScope.forWorkspace(workspace.id);
                this.startAnalysis(scope, workspace);
            }
        });

        MongoWorkspace.findByIdAndUpdate(this._workspace.id, {
            $set: {permanentDisableVT: false}
        }).then(x => {
            console.log('Reset permanent disabled state for workspace with id ' + this._workspace.id);
        });

        //Unbind previous socket event handlers (in case multiple handlers were assigned)
        this.workspace.emitter.off('setVirtualTeacherMode', this.setFeedbackMode);
        this.workspace.emitter.off('moveCardToGroup', this.cardChanged);
        this.workspace.emitter.off('updateNoteInGroupCard', this.cardChanged);
        this.workspace.emitter.off('removeCardFromGroup', this.cardChanged);
        this.workspace.emitter.off('updateCardPositionWithinGroup', this.cardChanged);
        this.workspace.emitter.off('updateQuestionInGroup', this.cardChanged);
        this.workspace.emitter.off('addGroupToWorkspace', this.groupChanged);
        this.workspace.emitter.off('removeGroup', this.groupChanged);
        this.workspace.emitter.off('generateFeedback', this.manualTrigger);

        //Bind new socket event handlers to receive notifications when the user edits the project approach.
        this.workspace.emitter.on('setVirtualTeacherMode', this.setFeedbackMode);
        this.workspace.emitter.on('moveCardToGroup', this.cardChanged);
        this.workspace.emitter.on('updateNoteInGroupCard', this.cardChanged);
        this.workspace.emitter.on('removeCardFromGroup', this.cardChanged);
        this.workspace.emitter.on('updateCardPositionWithinGroup', this.cardChanged);
        this.workspace.emitter.on('updateQuestionInGroup', this.cardChanged);
        this.workspace.emitter.on('addGroupToWorkspace', this.groupChanged);
        this.workspace.emitter.on('removeGroup', this.groupChanged);
        this.workspace.emitter.on('generateFeedback', this.manualTrigger);

        //Sycnhronize the current feedback mode with all connected clients.
        this.workspace.emit('enableVirtualTeacher');
        this.workspace.emit('setVirtualTeacherMode', this._feedbackMode);

        console.log('started VT instance for room: ' + this.workspace.id)
    };

    /**Stops this virtual teacher instance. Does not affect the current mode of feedback.*/
    stop(args) {
        if (!this._isRunning) return;
        this._isRunning = false;

        const data = args ? args[0] : undefined;
        this._autoReenable = data == null ? true : !data.temporary;
        
        if (data && !data.temporary) {
            MongoWorkspace.findByIdAndUpdate(this._workspace.id, {
                $set: {permanentDisableVT: true}
            }).then(x => {
                console.log("permanently disabled virtual teacher for workspace with id " + this._workspace.id);
                this._isPermanentlyDisabled = true;
            });
        }

        this._isManuallyDisabled = true;

        //Unbind socket event handlers
        this.workspace.emitter.off('setVirtualTeacherMode', this.setFeedbackMode);
        this.workspace.emitter.off('moveCardToGroup', this.cardChanged);
        this.workspace.emitter.off('updateNoteInGroupCard', this.cardChanged);
        this.workspace.emitter.off('removeCardFromGroup', this.cardChanged);
        this.workspace.emitter.off('updateCardPositionWithinGroup', this.cardChanged);
        this.workspace.emitter.off('updateQuestionInGroup', this.cardChanged);
        this.workspace.emitter.off('addGroupToWorkspace', this.groupChanged);
        this.workspace.emitter.off('removeGroup', this.groupChanged);

        this.workspace.emit('disableVirtualTeacher');

        console.log('stopped VT instance for room: ' + this.workspace.id)
    };

    /**
     * Socket event handler for when a user edits a group ("project phase").
     * @param {*} group The group that has changed.
     */
    groupChanged([group, workspace]) {
        this._workspaceChanged = true;
        const scope = VTEngineWorkspaceScope.forWorkspace(workspace.id);
        console.log('got group change data from socket');
        this.startAnalysis(scope, workspace)
    }

    /**
     * Socket event handler for when a user edits a card ("question", "research method" or "stepping stone")
     * @param {*} card The card that has changed.
     */
    cardChanged([card, workspace]) {
        this._workspaceChanged = true;
        const scope = VTEngineWorkspaceScope.forWorkspace(workspace.id);
        console.log('got card change data from socket');
        this.startAnalysis(scope, workspace);
    }

    /**Sets the virtual teacher feedback engine into the given mode, e.g. 'creating', 'editing' or 'reviewing'. 
     * The type of feedback that is generated, depends on this mode.
    */
    setFeedbackMode([mode, workspace]) {
        if (this._feedbackMode == mode) return;

        console.log('Setting feedback mode to: ' + mode);
        this._feedbackMode = mode;
        this.workspace.emit('setVirtualTeacherMode', mode);
        const scope = VTEngineWorkspaceScope.forWorkspace(workspace.id);

        this.startAnalysis(scope, workspace);
    }

    manualTrigger([workspace]) {
        const scope = VTEngineWorkspaceScope.forWorkspace(workspace.id);
        console.log(workspace);
        this.startAnalysis(scope, workspace);
    }

    setRuleEnabled([ruleId, enabled, workspace]) {
        MongoWorkspace.findById(this._workspace.id).then(workspace => {
            let disabledRuleIds = workspace.disabledRuleIds;
            if (enabled) {
                const ruleIndex = disabledRuleIds.indexOf(ruleId);
                if (ruleIndex >= 0) disabledRuleIds.splice(ruleIndex);
            }
            else {
                const ruleIndex = disabledRuleIds.indexOf(ruleId);
                if (ruleIndex < 0) disabledRuleIds.push(ruleId);
            }
            disabledRuleIds = disabledRuleIds.filter(x => x);
            MongoWorkspace.findByIdAndUpdate(this._workspace.id, {
                $set: {disabledRuleIds, disabledRuleIds}
            }).then(() => {
                this._disabledRuleIds = disabledRuleIds;
                this._workspace.emit('setRuleEnabled', disabledRuleIds);
                this.manualTrigger([workspace]);
            });
        });
    }

    /**
     * Indicates if this virtual teacher is currently "occupied" (has at least one active user).
     * @returns 
     */
    isOccupied() {
        if (!this.workspace) return false;
        if (this.workspace.active.length == 0) return false;
        return true;
    }

    dispose() {
        this.stop();
        this._workspace.emitter.off('enableVirtualTeacher', this.start);
        this._workspace.emitter.off('disableVirtualTeacher',this.stop);
    }
}