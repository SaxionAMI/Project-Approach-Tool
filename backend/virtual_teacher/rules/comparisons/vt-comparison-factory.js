const VTComparisonLT = require("./vt-comparison-lt")
const VTComparisonLTE = require("./vt-comparison-lte")
const VTComparisonE = require("./vt-comparison-e")
const VTComparisonNE = require("./vt-comparison-ne")
const VTComparisonGTE = require("./vt-comparison-gte")
const VTComparisonGT = require("./vt-comparison-gt")

module.exports = class VTComparisonFactory {
    static fromType(type) {
        switch(type) {
            case "VTComparisonLT": return new VTComparisonLT();
            case "VTComparisonLTE": return new VTComparisonLTE();
            case "VTComparisonE": return new VTComparisonE();
            case "VTComparisonNE": return new VTComparisonNE();
            case "VTComparisonGTE": return new VTComparisonGTE();
            case "VTComparisonGT": return new VTComparisonGT();
            default: return null;
        }
    }
}

    