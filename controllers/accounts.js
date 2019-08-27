'use strict';
const playgymStore = require("../models/playgym-store");
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

    index(request, response) {
        const viewData = {
            title: 'Login or Signup',
        };
        response.render('index', viewData);
    },

    login(request, response) {
        const viewData = {
            title: 'Login to the Service',

        };
        response.render('login', viewData);
    },

    logout(request, response) {
        response.cookie('playgym', '');
        response.redirect('/');
    },

    signup(request, response) {
        const viewData = {
            title: 'Login to the Service',
        };
        response.render('signup', viewData);
    },

    update(request, response) {
        const viewData = {
        title: 'Updating details',
    };
    response.render('accountsettings',viewData);
    },

    register(request, response) {
        const user = request.body;
        user.id = uuid();
        user.role = 'M';
        userstore.addUser(user);
        logger.info(`registering ${user.email}`);
        const newMemberList = {
            id: user.id,
            name: request.body.name,
            assessments: []
        };
        logger.debug("Creating a new Memberlist", newMemberList);
        playgymStore.addMemberlist(newMemberList);
        response.redirect('/');

    },

    authenticate(request, response) {
        const user = userstore.getUserByEmail(request.body.email);
        if (user) {
            response.cookie('playgym', user.email);
            logger.info(`logging in ${user.email}`);
            if (user.role == 'T') {
                response.redirect('/trainerdashboard/');
            } else {
                response.redirect('/dashboard/'+user.id)
            }
        } else {
            response.redirect('/login');
        }
    },

    getCurrentUser(request) {
        const userEmail = request.cookies.memberlist;
        return userstore.getUserByEmail(userEmail);
    }
};

module.exports = accounts;