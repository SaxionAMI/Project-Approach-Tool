const VirtualTeacherService = require('./virtual_teacher/VirtualTeacherService');

const vtInstances = [];
module.exports = {
    /**
     * Try and create a virtual teacher instance for the given workspace / room. 
     * Only succeeds if a VT instance for this room doesn't already exist.
     * For best effect, try calling this function every time a user connects to a room.
     * @param {*} workspace The room / workspace to create a VT instance for.
     * @param {*} workspaceEvents An object used to pass workspace edit events to the VT 
     * to start the feedback analysis. Can be obtained from the socket service.
     */
    tryCreateVtInstance(workspace, socketId) {
        let vtIndex = vtInstances.findIndex(x => x.workspace.id == workspace.id);
        if (vtIndex >= 0) {
            let instance = vtInstances[vtIndex];
            if (vtInstances[vtIndex].isOccupied()) {
                console.log('VT instance for room ' + workspace.id + ' already exists.');
                instance.newUserConnected(socketId);
            }
            else {
                //remove old, unoccupied VT instance.
                vtInstances.splice(vtIndex);
                instance.dispose();
                delete instance;

                console.log('creating new instance...');
                let vt = new VirtualTeacherService(workspace);
                vtInstances.push(vt);
            }
        }
        else {
            console.log('creating new instance...');
            let vt = new VirtualTeacherService(workspace);
            vtInstances.push(vt);
        }
    },
    /**
     * Try to remove a virtual teacher instance. Only succeeds if the given room ha no active users.
     * For best effect, try calling this function every time a user disconnects from a room.
     * @param {*} workspace The room / workspace to try and remove VT instance for.
     */
    tryRemoveVtInstance(workspace) {
        let vtIndex = vtInstances.findIndex(x => x.workspace.id == workspace.id);
        if (vtIndex >= 0) {
            let vt = vtInstances[vtIndex];
            if (vt.workspace.active.length == 0) {
                vt.stop();
                vtInstances.splice(vtIndex);
            }
        }
    }
}