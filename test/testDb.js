var db = require('../db');

var chai = require('chai');
var assert = chai.assert;

before(function() {
  db.initDB();
});

describe('test getting tweet stream', function () {

    it('should get tweets for user', function() {
        db.getTweetStreamByUser(1);
    });
});