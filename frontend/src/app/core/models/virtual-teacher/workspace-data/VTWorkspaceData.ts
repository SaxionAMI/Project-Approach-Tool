import { Workspace } from "../../workspace.model";
import { VTGroupData } from "./VTGroupData";

export class VTWorkspaceData {
    groups: VTGroupData[];
    id: string;
    disabledRuleIds: string[];

    constructor(workspace: Workspace) {
        this.groups = workspace.groups.map(x => new VTGroupData(x));
        this.id = workspace._id;
        const disabledRuleIds = workspace.disabledRuleIds ?? [];
        this.disabledRuleIds = disabledRuleIds.filter(x => x != null && x.length > 0);
    }
}