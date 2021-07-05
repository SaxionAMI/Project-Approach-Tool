const mongoose = require("mongoose");
const Deck = mongoose.model("Deck");
const Card = mongoose.model("Card");
const Template = mongoose.model("Template");
const VtAction = mongoose.model("VtAction");
const VtCondition = mongoose.model("VtCondition");
const VtComparison = mongoose.model("VtComparison");
const VtScope = mongoose.model("VtScope");
const VtSeverity = mongoose.model("VtSeverity");
const VtCatalogTab = mongoose.model("VtCatalogTab");
const VtRule = mongoose.model("VtRule");
const VtPhase = mongoose.model("VtPhase");
const VtStrategy = mongoose.model("VtStrategy");
const Express = require("express");
const Router = Express.Router();
const fs = require("fs");
const vtComparison = require("./models/virtual_teacher/vtComparison");
mongoose.set("useFindAndModify", false);

// adds the stepping stone cards to the database
fs.readFile("./json/steppingStone.json", async(err, fileData) => {
  const steppingStones = JSON.parse(fileData);
  steppingStones.forEach((card) => {
    Card.findByIdAndUpdate(card._id, card, { upsert: true }, function (
      error,
      result
    ) {
      if (error) return;
    });
  });
});

// adds the ICT research method cards to the database
fs.readFile("./json/ict-methods.json", (err, fileData) => {
  const methods = JSON.parse(fileData);
  methods.forEach((card) => {
    Card.findByIdAndUpdate(card._id, card, { upsert: true }, function (
      error,
      result
    ) {
      if (error) return;
    });
  });
});

// adds the CMD research method cards to the database
fs.readFile("./json/cmd-methods.json", (err, fileData) => {
  const methods = JSON.parse(fileData);
  methods.forEach((card) => {
    Card.findByIdAndUpdate(card._id, card, { upsert: true }, function (
      error,
      result
    ) {
      if (error) return;
    });
  });
});

// adds the Engineering research method cards to the database
fs.readFile("./json/engineer-methods.json", (err, fileData) => {
  const methods = JSON.parse(fileData);
  methods.forEach((card) => {
    Card.findByIdAndUpdate(card._id, card, { upsert: true }, function (
      error,
      result
    ) {
      if (error) return;
    });
  });
});

// adds card decks to the database
fs.readFile("./json/decks.json", async(err, fileData) => {
  const methods = JSON.parse(fileData);
  methods.forEach(async(deck) => {
      Deck.findByIdAndUpdate(deck._id, deck, { upsert: true }, function (
        error,
        result
      ) {
        if (error) return;
      });
  });
});

//  adds templates to the database
fs.readFile("./json/templates.json", async(err, fileData) => {
  const templates = JSON.parse(fileData);
  templates.forEach(async(template) => {
      Template.findByIdAndUpdate(template._id, template, { upsert: true }, function (
        error,
        result
      ) {
        if (error) return;
      });
  });
});

//  adds Virtual Teacher actions to the database
fs.readFile("./json/virtual_teacher/vt-rule-actions.json", async(err, fileData) => {
  const actions = JSON.parse(fileData);
  actions.forEach(async(action) => {
    const existing = await VtAction.findOne({type: action.type});
    if (existing) {
      VtAction.findByIdAndUpdate(existing._id, action, (error, result) => {
        if (error) return;
      });
    }
    else {
      const dbAction = new VtAction(action);
      await dbAction.save();
    }
  });
});

//  adds Virtual Teacher conditions to the database
fs.readFile("./json/virtual_teacher/vt-rule-conditions.json", async(err, fileData) => {
  const conditions = JSON.parse(fileData);
  conditions.forEach(async(condition) => {
      const existing = await VtCondition.findOne({type: condition.type});
      if (existing) {
        VtCondition.findByIdAndUpdate(existing._id, condition, (error, result) => {
          if (error) return;
        });
      }
      else {
        const dbCondition = new VtCondition(condition);
        await dbCondition.save();
      }
  });
});

//  adds Virtual Teacher conditions to the database
fs.readFile("./json/virtual_teacher/vt-rule-comparisons.json", async(err, fileData) => {
  const comparisons = JSON.parse(fileData);
  comparisons.forEach(async(comparison) => {
      const existing = await VtComparison.findOne({type: comparison.type});
      if (existing) {
        VtComparison.findByIdAndUpdate(existing._id, comparison, (error, result) => {
          if (error) return;
        });
      }
      else {
        const dbComparison = new VtComparison(comparison);
        await dbComparison.save();
      }
  });
});

//  adds Virtual Teacher conditions to the database
fs.readFile("./json/virtual_teacher/vt-rule-scopes.json", async(err, fileData) => {
  const scopes = JSON.parse(fileData);
  scopes.forEach(async(scope) => {
      const existing = await VtScope.findOne({type: scope.type});
      if (existing) {
        VtScope.findByIdAndUpdate(existing._id, scope, (error, result) => {
          if (error) return;
        });
      }
      else {
        const dbScope = new VtScope(scope);
        await dbScope.save();
      }
  });
});

//  adds Virtual Teacher severities to the database
fs.readFile("./json/virtual_teacher/vt-rule-action-severities.json", async(err, fileData) => {
  const severities = JSON.parse(fileData);
  severities.forEach(async(severity) => {
      const existing = await VtSeverity.findOne({type: severity.type});
      if (existing) {
        VtSeverity.findByIdAndUpdate(existing._id, severity, (error, result) => {
          if (error) return;
        });
      }
      else {
        const dbSeverity = new VtSeverity(severity);
        await dbSeverity.save();
      }
  });
});

//  adds Virtual Teacher severities to the database
fs.readFile("./json/virtual_teacher/vt-rule-action-catalog-tabs.json", async(err, fileData) => {
  const catalogTabs = JSON.parse(fileData);
  catalogTabs.forEach(async(catalogTab) => {
      const existing = await VtCatalogTab.findOne({type: catalogTab.type});
      if (existing) {
        VtCatalogTab.findByIdAndUpdate(existing._id, catalogTab, (error, result) => {
          if (error) return;
        });
      }
      else {
        const dbCatalogTab = new VtCatalogTab(catalogTab);
        await dbCatalogTab.save();
      }
  });
});

//  adds unconfigurable "always on" Virtual Teacher rules to the database.
fs.readFile("./json/virtual_teacher/vt-unconfigurable-always-on-rules.json", async(err, fileData) => {
  const rules = JSON.parse(fileData);
  rules.forEach(async(rule) => {
      const existing = await VtRule.findOne({_id: rule._id});
      if (existing) {
        VtRule.findByIdAndUpdate(existing._id, rule, (error, result) => {
          if (error) return;
        });
      }
      else {
        const dbRule = new VtRule(rule);
        dbRule.enabled = true;
        await dbRule.save();
      }
  });
});

//  adds supported Virtual Teacher feedback modes / phases to the database.
fs.readFile("./json/virtual_teacher/vt-configurable-phases.json", async(err, fileData) => {
  const phases = JSON.parse(fileData);
  phases.forEach(async(phase) => {
      const existing = await VtPhase.findOne({identifier: phase.identifier});
      if (existing) {
        VtPhase.findByIdAndUpdate(existing._id, phase, (error, result) => {
          if (error) return;
        });
      }
      else {
        const dbPhase = new VtPhase(phase);
        await dbPhase.save();
      }
  });
});

//  adds supported Virtual Teacher strategies to the database.
fs.readFile("./json/virtual_teacher/vt-rule-strategies.json", async(err, fileData) => {
  const strategies = JSON.parse(fileData);
  strategies.forEach(async(strategy) => {
      const existing = await VtStrategy.findOne({identifier: strategy.identifier});
      if (existing) {
        VtStrategy.findByIdAndUpdate(existing._id, strategy, (error, result) => {
          if (error) return;
        });
      }
      else {
        const dbStrategy = new VtStrategy(strategy);
        await dbStrategy.save();
      }
  });
});

module.exports = Router;
