"use strict";

const express = require("express");
const router = express.Router();


const trainerdashboard = require("./controllers/trainerdashboard.js");
const about = require("./controllers/about.js");
const dashboard = require("./controllers/dashboard.js");
const trainerassessment = require("./controllers/trainerassessment.js");
const accounts = require('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/update', accounts.update);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);




router.get("/trainerdashboard", trainerdashboard.index);
router.get("/trainerdashboard/deletememberlist/:id", trainerdashboard.deleteMemberlist);


router.get("/about", about.index);
router.get("/dashboard/:id", dashboard.index);
router.get("/dashboard/:id/deleteassessment/:assessmentid", dashboard.deleteAssessment);
router.post("/dashboard/:id/addassessment", dashboard.addAssessment);

router.get("/trainerassessment/:id", trainerassessment.index);
router.post("/trainerassessment/:id/addcomment/:assessmentid", trainerassessment.addComment);


module.exports = router;
