"use strict";

const logger = require("../utils/logger");
const playgymStore = require("../models/playgym-store");
const uuid = require("uuid");

const trainerassessment = {
    index(request, response) {
        const memberlistId = request.params.id;
        logger.debug("Memberlist id = ", memberlistId);
        const viewData = {
            title: "Trainerassessment",
            memberlist: playgymStore.getMemberlist(memberlistId)
        };
        response.render("trainerassessment", viewData);
    },

    addComment(request, response) {

        const assessmentId = request.params.assessmentid;
        const memberlistid = request.params.id;

        logger.debug("New Comment = ", request.body.comment);
        playgymStore.addComment(memberlistid, assessmentId, request.body.comment);
        response.redirect("/trainerassessment/" + assessmentId);
    },
};

module.exports = trainerassessment;