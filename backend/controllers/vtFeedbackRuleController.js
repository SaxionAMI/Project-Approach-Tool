const mongoose = require("mongoose");
const VtRuleValidator = require("../validators/vt-rule-validator");
const VtRule = mongoose.model("VtRule");
const VtAction = mongoose.model("VtAction");
const VtCondition = mongoose.model("VtCondition");
const VtComparison = mongoose.model("VtComparison");
const VtScope = mongoose.model("VtScope");
const VtSeverity = mongoose.model("VtSeverity");
const VtCatalogTab = mongoose.model("VtCatalogTab");
const VtPhase = mongoose.model("VtPhase");
const VtStrategy = mongoose.model("VtStrategy");
const sanityChecks = require('./sanity-checks');
mongoose.set("useFindAndModify", false);

const genericErrorGet = 'An unknown error occurred. Please try again later.';
const genericErrorPost = 'An unknown error occurred. Your changes could not be saved. Please try again later.';

/**
 * Get a list of all enabled global virtual teacher feedback rules.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
 exports.getEnabledRules = function (req, res) {
  VtRule.find({enabled: true}).then(rules => {
      res.status(200).json(rules);
  })
  .catch(error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorGet
    })
  });
};

/**
 * Get a list of global virtual teacher feedback rules.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
exports.getRules = function (req, res) {
    VtRule.find({}).then(rules => {
        res.status(200).json(rules);
    })
    .catch(error => {
      console.warn(error);
      res.status(500).send({
        message: genericErrorGet
      })
    });
};

/**
 * Update an existing global virtual teacher feedback rule.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
exports.updateRule = function(req, res) {
  sanityChecks.rejectIfNull(res, req.params._id, 400, 'Please specify the id of the feedback rule to update.')
  sanityChecks.rejectIfNotExists(
    res, 
    VtRule.exists({_id: req.params._id}), 
    'Cannot find a feedback rule with id ' + req.params._id,
    () => {
      const rule = new VtRule(req.body);
      const validator = new VtRuleValidator();
      const validationResult = validator.validate(rule);
      sanityChecks.rejectIfValidationErrors(res, validationResult, () => {
        VtRule.findByIdAndUpdate(req.params._id, rule).then(dbRule => {
          res.status(200).json(dbRule);
        })
        .catch(error => {
          console.warn(error);
          res.status(500).send({
            message: genericErrorPost
          });
        });
      });
    });
}

/**
 * Create a new global virtual teacher feedback rule.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
exports.createRule = function(req, res) {
  const rule = new VtRule(req.body);
  rule._id = null;
  rule.configurable = true;
  const validator = new VtRuleValidator();
  const validationResult = validator.validate(rule);
  sanityChecks.rejectIfValidationErrors(res, validationResult, () => {
    rule
      .save()
      .then(dbRule => {
        res.status(200).json(dbRule);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send({
          message: genericErrorPost
        });
      });
  });
}

/**
 * Delete a global virtual teacher feedback rule.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
exports.deleteRule = function(req, res) {
  const id = req.params._id;
  sanityChecks.rejectIfNull(res, id);
  sanityChecks.rejectIfNotExists(
    res, 
    VtRule.exists({_id: id}), 
    'Could not find a rule with id ' + id, 
    () => {
      VtRule.findByIdAndDelete(id).then(rule => {
        res.status(200).json(rule);
      })
      .catch(error => {
        console.warn(error);
        res.status(500).send({
          message: genericErrorPost
        })
      })
    }
  );
}

/**
 * Enable a global virtual teacher feedback rule.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
exports.setRuleEnabled = function(req, res) {
  console.log(req.body);
  const id = req.params._id;
  const enable = req.body.enable === true;
  const catchAll = error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorPost
    })
  };

  sanityChecks.rejectIfNull(res, id);
  sanityChecks.rejectIfNotExists(
    res, 
    VtRule.exists({_id: id}),
    'Could not find a rule with id ' + id, 
    () => {
      VtRule.findByIdAndUpdate(id, {
        $set: { enabled: enable }
      }).then(rule => {
          console.log(rule);
          res.status(200).json(rule);
      }).catch(catchAll);
    });
}

/**
 * Get a list of all supported rule condition modules.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
exports.getConditions = function(req, res) {
  VtCondition.find({}).then(conditions => {
    res.status(200).json(conditions);
  })
  .catch(error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorGet
    });
  });
}

/**
 * Get a list of all supported rule comparison modules.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
 exports.getComparisons = function(req, res) {
  VtComparison.find({}).then(comparisons => {
    res.status(200).json(comparisons);
  })
  .catch(error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorGet
    });
  });
}

/**
 * Get a list of all supported rule scope modules.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
 exports.getScopes = function(req, res) {
  VtScope.find({}).then(scopes => {
    res.status(200).json(scopes);
  })
  .catch(error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorGet
    });
  });
}

/**
 * Get a list of all supported rule severities.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
 exports.getSeverities = function(req, res) {
  VtSeverity.find({}).then(scopes => {
    res.status(200).json(scopes);
  })
  .catch(error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorGet
    });
  });
}

/**
 * Get a list of all supported rule catalog tabs.
 * @param {import("express").Request} req The request to answer.
 * @param {import("express").Response} res The response to serve.
 */
 exports.getCatalogTabs = function(req, res) {
  VtCatalogTab.find({}).then(scopes => {
    res.status(200).json(scopes);
  })
  .catch(error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorGet
    });
  });
}

/**
 * Get a list of all supported rule action modules.
 * @param {import("express").Request} req The request to answer. Expects a boolean 'primary' route parameter.
 * @param {import("express").Response} res The response to serve.
 */
exports.getActions = function(req, res) {
  VtAction.find({}).then(scopes => {
    res.status(200).json(scopes);
  })
  .catch(error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorGet
    });
  });
}

/**
 * Get a list of all supported feedback modes / phases.
 * @param {import("express").Request} req The request to answer. Expects a boolean 'primary' route parameter.
 * @param {import("express").Response} res The response to serve.
 */
 exports.getPhases = function(req, res) {
  VtPhase.find({}).then(scopes => {
    res.status(200).json(scopes);
  })
  .catch(error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorGet
    });
  });
}

/**
 * Get a list of all supported strategies.
 * @param {import("express").Request} req The request to answer. Expects a boolean 'primary' route parameter.
 * @param {import("express").Response} res The response to serve.
 */
 exports.getStrategies = function(req, res) {
  VtStrategy.find({}).then(scopes => {
    res.status(200).json(scopes);
  })
  .catch(error => {
    console.warn(error);
    res.status(500).send({
      message: genericErrorGet
    });
  });
}