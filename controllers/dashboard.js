"use strict";
const accounts = require ('./accounts.js');
const logger = require("../utils/logger");
const userStore = require("../models/user-store")
const playgymStore = require("../models/playgym-store");
const analytics = require("../utils/analytics.js");
const uuid = require("uuid");

const dashboard = {
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
        logger.debug("Memberlist id = ", memberlistid);

        const viewData = {
            title: "Dashboard",
            memberlist: memberlist,
            BMI: bmi,
            bmiCat: bmiCat,
            idealWeightIndicator: idealWeightIndicator,

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
            hips: request.body.hips,

        };

        logger.debug("New Assessment = ", newAssessment);
        playgymStore.addAssessment(memberlistid, newAssessment);
        response.redirect("/dashboard/" + memberlistid );
    }
};

module.exports = dashboard;
