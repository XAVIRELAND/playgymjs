"use strict";


const _ = require("lodash");
const JsonStore = require("./json-store");

const playgymStore = {
    store: new JsonStore("./models/playgym-store.json", {
        playgymCollection: []
    }),
    collection: "playgymCollection",




    getUserMemberlists(userid) {
        return this.store.findBy(this.collection, { userid: userid });
    },


    getAllMemberlist() {
        return this.store.findAll(this.collection);
    },

    getMemberlist(id) {
        return this.store.findOneBy(this.collection,{ id: id });

    },

    getAssessment(id) {
        return this,store.findOneBy(this.collection.assessments, { id: id });
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
        memberlist.assessments.reverse();

        Date.prototype.today = function () {
            return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
        }


        Date.prototype.timeNow = function () {
            return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
        }
        const newDate = new Date();
        const dateTime = newDate.today() +" "+newDate.timeNow();
        assessment.date = dateTime

        this.store.save();

    },


    removeAssessment(id, assessmentId) {
        const memberlist = this.getMemberlist(id);
        const assessments = memberlist.assessments;
        _.remove(assessments, { id: assessmentId });
        this.store.save();
    },

    addComment(id, assessmentId, comment) {
        const memberlist = this.getMemberlist(id);
        const assessments = memberlist.assessments;
        const assessment = _.find(assessments, {id: assessmentId});
        assessment.comment = comment;
        _.update(assessments, assessment);
        memberlist.assessments = assessments;
        this.store.save();

    }
};

module.exports = playgymStore;
