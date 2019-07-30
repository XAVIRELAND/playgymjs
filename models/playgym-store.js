"use strict";


const _ = require("lodash");
const JsonStore = require("./json-store");

const playgymStore = {
    store: new JsonStore("./models/playgym-store.json", {
        playgymCollection: []
    }),
    collection: "playgymCollection",

    getAllMemberlist() {
        return this.store.findAll(this.collection);
    },

    getMemberlist(id) {
        return this.store.findOneBy(this.collection,{ id: id });
    },

    addMemberlist(memberlist) {
        this.store.add(this.collection, memberlist);
        this.store.save();
    },

    removeMemberlist(id) {
        const memberlist = this.getMemberlist(id);
        this.store.remove(this.collection, memberlist);
        this.store.save();
    },

    removeAllMemberlist() {
        this.store.removeAll(this.collection);
        this.store.save();
    },


    addAssessment(id, assessment) {
        const memberlist = this.getMemberlist(id);
        memberlist.assessments.push(assessment);
        this.store.save();

    },

    removeAssessment(id, assessmentId) {
        const memberlist = this.getMemberlist(id);
        const assessments = memberlist.assessments;
        _.remove(assessments, { id: assessmentId });
        this.store.save();
    }
};

module.exports = playgymStore;
