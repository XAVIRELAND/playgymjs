"use strict";

const logger = require("../utils/logger");
const playgymStore = require("../models/playgym-store");
const uuid = require("uuid");

const trainerassessment = {
    index(request, response) {
        const memberlistId = request.params.id;
        logger.debug("Memberlist id = ", memberlistId);
        const viewData = {
            title: "Dashboard",
            memberlist: playgymStore.getMemberlist(memberlistId)
        };
        response.render("trainerassessment", viewData);
    },

    addComment(request, response) {
        const memberlistid = request.params.id;
        const memberlist = playgymStore.getMemberlist(memberlistid);
        const assessmentId = request.params.assessmentid;
        const newComment = {
            id: uuid(),
            comment: request.body.comment,

        };
        logger.debug("New Comment = ", newComment);
        playgymStore.addComment(memberlistid,assessmentId, newComment);
        response.redirect("/trainerassessment/" + memberlistid);
    }

};

module.exports = trainerassessment;