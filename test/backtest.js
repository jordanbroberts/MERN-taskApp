
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
          chai.request(app)
              .get('/items')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });



describe('/POST task', () => {
          it('it should POST a task ', (done) => {
          let item = {
              name: "The Lord of the Rings",
              task: "J.R.R. Tolkien",
          }
              chai.request(app)
              .post('/add/post')
              .send(item)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.item.should.have.property('name');
                  res.body.item.should.have.property('task');
                done();
              });
        });
    });



describe('/GET/find/:id task', () => {
        it('it should GET a task by the given id', (done) => {
          let item = new Item({ name: "The Lord of the Rings", task: "J.R.R. Tolkien" });
          item.save((err, item) => {
              chai.request(app)
              .get('/item/find' + item._id)
              .send(item)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('title');
                  res.body.should.have.property('author');
                  res.body.should.have.property('_id').eql(item.id);
                done();
              });
          });

        });
    });
