"use strict";
const accounts = require ('./accounts.js');
const logger = require("../utils/logger");
const playgymStore = require("../models/playgym-store");
const uuid = require("uuid");

const trainerdashboard = {
  index(request, response) {
    logger.info("trainerdashboard rendering");
    const viewData = {
      id: uuid(),
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
  }
  
};


module.exports = trainerdashboard;



