const VTComparison = require("./vt-comparison");

module.exports = class VTComparisonLT extends VTComparison{
    compare(value1, value2) {
        return value1 < value2;
    }
}