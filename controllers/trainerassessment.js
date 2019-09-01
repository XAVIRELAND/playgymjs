"use strict";

const logger = require("../utils/logger");
const playgymStore = require("../models/playgym-store");
const userStore = require("../models/user-store");
const analytics = require("../utils/analytics.js");
const uuid = require("uuid");

const trainerassessment = {
    index(request, response) {
        const memberlistid = request.params.id;
        const user = userStore.getUserById(memberlistid)
        const memberlist = playgymStore.getMemberlist(memberlistid);
        let weight;
        if (memberlist.assessments.length > 0) {
            weight = memberlist.assessments[0].weight;
        } else {
            weight = user.startingWeight
        }
        const heigth = user.height;
        const bmi = analytics.calcBMI(weight, heigth);
        const bmiCat = analytics.bmiCat(bmi);
        const idealWeightIndicator = analytics.isIdealBodyWeight(user, weight);
        const date = user.dateGoal;
        const targetWeight = user.weightGoal;
        const weightDif= analytics.calcWeightDif(weight,targetWeight);
        logger.debug("Memberlist id = ", memberlistid);

        const viewData = {
            title: "Trainerassessment",
            memberlist: playgymStore.getMemberlist(memberlistid),
            BMI: bmi,
            bmiCat:bmiCat,
            idealWeightIndicator: idealWeightIndicator,
            date: date,
            weight1: weight,
            weight2: targetWeight,
            weightDif: weightDif,
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