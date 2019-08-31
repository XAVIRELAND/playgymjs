"use strict";

const logger = require("../utils/logger");
const playgymStore = require("../models/playgym-store");
const userStore = require("../models/user-store");
const analytics = require("../utils/analytics.js");
const uuid = require("uuid");

const trainerassessment = {
    index(request, response) {
        const memberlistId = request.params.id;
        const memberlistid = request.params.id;
        const assessments = playgymStore.getMemberlist(memberlistid).assessments;
        const weight = assessments[0].weight;
        const heigth = userStore.getUserById(memberlistid).height;
        const bmi = analytics.calcBMI(weight, heigth);
        const bmiCat = analytics.bmiCat(bmi);
        logger.debug("Memberlist id = ", memberlistid);

        const viewData = {
            title: "Trainerassessment",
            memberlist: playgymStore.getMemberlist(memberlistId),
            BMI: bmi,
            bmiCat:bmiCat,
        };
        response.render("trainerassessment", viewData);
    },

    addComment(request, response) {

        const assessmentId = request.params.assessmentid;
        const memberlistid = request.params.id;

        logger.debug("New Comment = ", request.body.comment);
        playgymStore.addComment(memberlistid, assessmentId, request.body.comment);
        response.redirect("/trainerassessment/" + memberlistid);
    },
};

module.exports = trainerassessment;