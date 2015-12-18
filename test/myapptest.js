var assert = require("chai").assert;
var http   = require("http");
var server = require("../server/server.js");
var request = require("supertest");
var db = require("../server/database/connection.js");

describe('Server connections', function () {
    after(function (done) {
                  db('users')
                    .where('username', 'marcus')
                    .del()
                    .then(function () {
                      done();
                    });
      // runs after tests in this block
    });
    it("can return a 200 response", function (done) {
        var app = server;
        request(app)
            .get("/")
            .expect(200, done);
    });
    it("It can return a 201 response with a post request", function (done) {
        var app = server;
        var user = { "username" : "marcus", "email" : "marcus@marcus.com", "password": "password", "firstname" : "Mark", "secondname" : "Thomas"};

        request(app)
          .post("/api/signup")
          .send(user)
          .expect(201, done);
    });
  });

    it("It can return a status of 409 with an incorrect password", function (done) {
      var app = server;
      var user = {"username" : "marcus", "password" : "wrongpassword"};
        request(app)
          .post("/api/signin")
          .send(user)
          .expect(409, done);
    });

    it("It can return a status of 409 with an incorrect username", function (done) {
      var app = server;
      var user = {"username" : "marcusthesecond", "password" : "password"};
        request(app)
          .post("/api/signin")
          .send(user)
          .expect(409)
          .end(done);
  });

  describe('Database test', function () {
    beforeEach(function (done) { //runs before each test on this block and seeds database
                  db('users')
                  .insert({"username" : "marcus", "hashedpw" : db.raw( "crypt('" + 'password' + "', gen_salt('md5'))" ), "email" : "marcus@marcus.com", "firstname" : "Mark", "secondname" : "Thomas"})
                  .then(function () {
                    done();
                  });
                });
      afterEach(function (done) { //runs after each test in this block and deletes db entry
                db('users')
                  .where('username', 'marcus')
                  .del()
                  .then(function () {
                    done();
                  });
                });

    it("It can retrieve a user with the correct username and password", function (done) {
        var app = server;
        var user = { "username" : "marcus", "password" : "password"};

        request(app)
          .post("/api/signin")
          .send(user)
          .expect(201)
          .expect(function (res) {
            res.body.email = "marcus@marcus.com";
          })
          .end(done);
    });

    it("It can return a 409 when tryng to signup a user with a username that already exists", function (done) {
        var app = server;
        var user = { "username" : "marcus", "password" : "password", "email" : "newmemail@email.com" };

        request(app)
          .post("/api/signup")
          .send(user)
          .expect(409)
          .end(function () {
                  db('users')
                    .where('username', 'marcus')
                    .del()
                    .then(function () {
                      done();
                    });
                });
    });

  });
