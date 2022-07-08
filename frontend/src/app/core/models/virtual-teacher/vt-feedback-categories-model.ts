import { VTActionShowMetrics } from "./actions/vt-action-show-metrics";
import { VTPrimaryAction } from "./actions/vt-primary-action";

export class VTFeedbackCategoriesModel{
    warnings: VTPrimaryAction[];
    informations: VTPrimaryAction[];
    questions: VTPrimaryAction[];
    metrics: VTPrimaryAction[];

    constructor() {
        this.warnings = [];
        this.informations = [];
        this.questions = [];
        this.metrics = [];
    }

    add (feedbackAction: VTPrimaryAction) {
        switch(feedbackAction.severity) {
            case 'warning':
                this.warnings.push(feedbackAction);
                break;
            case 'information': 
                this.informations.push(feedbackAction);
                break;
            case 'question': 
                this.questions.push(feedbackAction);
                break;
            case 'metrics':
                this.metrics.push(feedbackAction);
            default: return;
        }
    }

    clear() {
        this.warnings = [];
        this.informations = [];
        this.questions = [];
        this.metrics = [];
    }

    get hasWarnings() {
        return this.warnings.length > 0;
    }

    get hasInformations() {
        return this.informations.length > 0;
    }

    get hasQuestions() {
        return this.questions.length > 0;
    }

    get hasMetrics() {
        return this.metrics.length > 0;
    }

    metricOfType(value) {
        return this.metrics.find(x => {
            if (x instanceof VTActionShowMetrics) {
                return x.metrics.type == value;
            }
            return false;
        });
    }
}