
let mongoose = require("mongoose");
var Item = require('../models/item.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Tasks', () => {
    beforeEach((done) => { //Before each test we empty the database
        Item.remove({}, (err) => {
           done();
        });
    });

    describe('/GET task', () => {
        it('it should GET all the tasks', (done) => {
          chai.request(server)
              .get('/items')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });
