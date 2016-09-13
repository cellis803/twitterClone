var db = require('../db');

var chai = require('chai');
var expect = require("chai").expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised); 
chai.should(); 

var assert = chai.assert;

before(function() {
  db.initDB();
});

describe('test getting tweet stream', function () {

    it('should get tweets for user', function() {
        return db.getTweetStreamByUser(1).then(function(data){
            expect(data.length).to.equal(9);
        });

    });
});


describe('test user login', function () {

    it('should get user ID for valid user', function() {
        return db.loginUser("Chris").then(function(data){
        expect(data.rowid).to.equal(1);

        });

    });
});

describe('test user login', function () {

    it('should return error for invalid user', function() {
        return expect(db.loginUser("invalid")).to.eventually.be.rejectedWith("User does not exist");

    });
});