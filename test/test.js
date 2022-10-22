import "dotenv/config.js";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import Contact from "../model/contact-model.js";
process.env.NODE_ENV = "test";

chai.use(chaiHttp);
chai.should();
if (process.env.NODE_ENV != "test") {
  process.exit(1);
} else {
  console.log("NODE_ENV is set to: ", process.env.NODE_ENV);
}
describe("Contacts", function (done) {
  this.timeout(10000);
  beforeEach((done) => {
    // Before each test we empty the database
    Contact.deleteOne({}, (err) => {
      done();
    });
  });

  // Test the /GET route
  describe("GET /", () => {
    // Test to get all contacts
    it("should get all contacts", function (done) {
      const contact = new Contact({
        name: "John Doe",
        email: "John@email.com",
        phoneNumber: "555-555-5555",
      });
      contact.save((err, contact) => {
        chai
          .request(app)
          .get("/api/contacts")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });
  });

  // Test the /POST route
  describe("POST /", () => {
    // Test to create a contact
    it("should create a new contact", function (done) {
      this.timeout(2000);
      const contact = {
        name: "Johnny Doe",
        email: "John@email.com",
        phoneNumber: "555-555-5555",
      };
      chai
        .request(app)
        .post("/api/contacts")
        .send(contact)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
    // Test to create existing contact
    it("should fail to create an existing contact", function (done) {
      this.timeout(2000);
      const contact = new Contact({
        name: "John Doe",
        email: "John@email.com",
        phoneNumber: "555-555-5555",
      });
      contact.save((err, contact) => {
        chai
          .request(app)
          .post("/api/contacts")
          .send(contact)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have
              .property("message")
              .eql("Contact already exists");
            done();
          });
      });
    });
    // Test the /PUT route
    describe("PUT /", () => {
      // Test to update a contact
      it("should update a contact's phone number", function (done) {
        this.timeout(5000);
        const contact = new Contact({
          name: "John Doe",
          email: "John@email.com",
          phoneNumber: "555-555-5555",
        });
        contact.save((err, contact) => {
          chai
            .request(app)
            .put("/api/contacts")
            .send({
              name: "John Doe",
              email: "John@email.com",
              phoneNumber: "555-555-5556",
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have
                .property("message")
                .eql("Updated contact number to 555-555-5556 successfully!");
              done();
            });
        });
      });
    });

    // Test the /DELETE route
    describe("DELETE /", () => {
      // Test to delete a contact
      it("should delete a contact", function (done) {
        this.timeout(5000);
        const contact = new Contact({
          name: "John Doe",
          email: "John@email.com",
          phoneNumber: "555-555-5555",
        });
        contact.save((err, contact) => {
          chai
            .request(app)
            .delete("/api/contacts/" + contact._id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have
                .property("message")
                .eql("Deleted contact successfully!");
              res.body.should.have.property("name").eql(contact.name);
              done();
            });
        });
      });

      // Test to delete non existent contact
      // it("Should indicate contact not exist", function (done) {
      //   this.timeout(5000);
      //   const id = "63545b4e486381e53eb6c7f1";
      //   chai
      //     .request(app)
      //     .delete("/api/contacts/" + id)
      //     .end((err, res) => {
      //       res.should.have.status(404);
      //       res.body.should.be.a("object");
      //       res.body.should.have
      //         .property("message")
      //         .eql("Contact does not exist");
      //       done();
      //     });
      // });
    });
  });
});
