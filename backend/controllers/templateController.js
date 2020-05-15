var mongoose = require("mongoose"),
Template = mongoose.model("Template");

exports.getTemplates = function(req, res) {
    Template.find({}, { _id: 0 }, function(err, result) {
        if (err) res.send(err);
        res.json(result);
    })
}

exports.addTemplate = function(req, res){
    var newTemplate = new Template(req.body);
    newTemplate.save(function(err, result) {
        if (err) res.send(err);
        res.json(result);
    })
}