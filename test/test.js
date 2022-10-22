import "dotenv/config.js";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import Contact from "../model/contact-model.js";
process.env.NODE_ENV = "test";

chai.use(chaiHttp);
chai.should();
if (process.env.NODE_ENV != "test") {
  console.log("NODE_ENV is not set to test");
  console.log("NOV_ENV is set to: ", process.env.NODE_ENV);
  process.exit(1);
} else {
  console.log("NOV_ENV is set to: ", process.env.NODE_ENV);
}
describe("Contacts", () => {
  beforeEach((done) => {
    // Before each test we empty the database
    Contact.remove({}, (err) => {
      done();
    });
  });

  // Tst the /GET route
  describe("GET /", () => {
    // Test to get all contacts
    it("should get all contacts", (done) => {
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

  // Test the /POST route
  describe("POST /", () => {
    // Test to create a contact
    it("should create a new contact", (done) => {
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
    // Test to create a contact
    // it("should fail to create an existing contact", (done) => {
    //   const contact = {
    //     name: "John Doe",
    //     email: "John@email.com",
    //     phoneNumber: "555-555-5555",
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/contacts")
    //     .send(contact)
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.body.should.be.a("object");
    //       done();
    //     });
    // });
    // Test the /PUT route
    describe("PUT /", () => {
      // Test to update a contact
      it("should update a contact", (done) => {
        const contact = new Contact({
          name: "John Doe",
          email: "John@email.com",
          phoneNumber: "555-555-5555",
        });
        contact.save((err, contact) => {
          chai
            .request(app)
            .put("/api/contacts/" + contact.id)
            .send({ phoneNumber: "555-555-5556" })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              done();
            });
        }

  });
});
