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
            expect(data.length).to.equal(11);
        });

    });
});
