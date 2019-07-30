"use strict";

const logger = require("../utils/logger");
const playgymStore = require("../models/playgym-store");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Playgym Dashboard",
      memberlists: playgymStore.getAllMemberlist(),
    };
    logger.info("about to render", playgymStore.getAllMemberlist());
    response.render("dashboard", viewData);
  },

  deleteMemberlist(request, response) {
    const memberlistId = request.params.id;
    logger.debug(`Deleting Memberlist ${memberlistId}`);
    playgymStore.removeMemberlist(memberlistId);
    response.redirect("/dashboard");
  },

  addMemberlist(request, response) {
    const newMemberList = {
      id: uuid(),
      title: request.body.title,
      assessments: []
    };
    logger.debug("Creating a new Memberlist", newMemberList);
    playgymStore.addMemberlist(newMemberList);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;



