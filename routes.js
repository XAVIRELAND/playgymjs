"use strict";

const express = require("express");
const router = express.Router();


const trainerdashboard = require("./controllers/trainerdashboard.js");
const about = require("./controllers/about.js");
const dashboard = require("./controllers/dashboard.js");
const trainerassessment = require("./controllers/trainerassessment.js");


router.get("/", trainerdashboard.index);
router.get("/trainerdashboard", trainerdashboard.index);
router.get("/trainerdashboard/deletememberlist/:id", trainerdashboard.deleteMemberlist);
router.post("/trainerdashboard/addmemberlist", trainerdashboard.addMemberlist);

router.get("/about", about.index);
router.get("/dashboard/:id", dashboard.index);
router.get("/dashboard/:id/deleteassessment/:assessmentid", dashboard.deleteAssessment);
router.post("/dashboard/:id/addassessment", dashboard.addAssessment);

router.get("/trainerassessment/:id", trainerassessment.index);
router.post("/trainerassessment/:id/addcomment/assessmentid", trainerassessment.addComment);

module.exports = router;
