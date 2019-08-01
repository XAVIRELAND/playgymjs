"use strict";

const logger = require("../utils/logger");
const playgymStore = require("../models/playgym-store");
const uuid = require("uuid");

const trainerdashboard = {
  index(request, response) {
    logger.info("trainerdashboard rendering");
    const viewData = {
      title: "Trainerdashboard",
      memberlists: playgymStore.getAllMemberlist()
    };
    logger.info("about to render", playgymStore.getAllMemberlist());
    response.render("trainerdashboard", viewData);
  },




  deleteMemberlist(request, response) {
    const memberlistId = request.params.id;
    logger.debug(`Deleting Memberlist ${memberlistId}`);
    playgymStore.removeMemberlist(memberlistId);
    response.redirect("/trainerdashboard");
  },

  addMemberlist(request, response) {
    const newMemberList = {
      id: uuid(),
      title: request.body.title,
      assessments: []
    };
    logger.debug("Creating a new Memberlist", newMemberList);
    playgymStore.addMemberlist(newMemberList);
    response.redirect("/trainerdashboard");
  }
};

module.exports = trainerdashboard;



