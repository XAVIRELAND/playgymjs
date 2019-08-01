"use strict";

const logger = require("../utils/logger");
const playgymStore = require("../models/playgym-store");
const uuid = require("uuid");

const dashboard = {
    index(request, response) {
        const memberlistId = request.params.id;
        logger.debug("Memberlist id = ", memberlistId);
        const viewData = {
            title: "Dashboard",
            memberlist: playgymStore.getMemberlist(memberlistId)
        };
        response.render("dashboard", viewData);
    },



    deleteAssessment(request, response) {
        const memberlistId = request.params.id;
        const assessmentId = request.params.assessmentid;
        logger.debug(`Deleting Assessment ${assessmentId} from Memberlist ${memberlistId}`);
        playgymStore.removeAssessment(memberlistId, assessmentId);
        response.redirect("/dashboard/" + memberlistId);
    },

    addAssessment(request, response) {
        const memberlistid = request.params.id;
        const memberlist = playgymStore.getMemberlist(memberlistid);
        const newAssessment = {
            id: uuid(),
            weight: request.body.weight,
            chest: request.body.chest,
            thigh: request.body.thigh,
            upperarm: request.body.upperarm,
            waist: request.body.waist,
            hips: request.body.hips

        };
        logger.debug("New Assessment = ", newAssessment);
        playgymStore.addAssessment(memberlistid, newAssessment);
        response.redirect("/dashboard/" + memberlistid);
    }
};

module.exports = dashboard;
