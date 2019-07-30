"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const memberlist = require("./controllers/memberlist.js");

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/dashboard/deletememberlist/:id", dashboard.deleteMemberlist);
router.post("/dashboard/addmemberlist", dashboard.addMemberlist);

router.get("/about", about.index);
router.get("/memberlist/:id", memberlist.index);
router.get("/memberlist/:id/deleteassessment/:assessmentid", memberlist.deleteAssessment);
router.post("/memberlist/:id/addassessment", memberlist.addAssessment);
module.exports = router;
