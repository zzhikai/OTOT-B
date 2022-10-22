import express from "express";

import {
  createContact,
  getContacts,
  updateContactNumber,
  deleteContact,
} from "./controller/contact-controller.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World from api!");
  // res.json({
  //   status: "API Its Working",
  //   message: "Welcome to API",
  // });
});

router.get("/admin", (req, res) => {
  // res.send("Hello World! api");
  res.json({
    status: "API Its Working",
    message: "Welcome to API",
  });
});

// Contact API /api/contact
// Contact routes
router.route("/contacts/:contact_id").delete(deleteContact);

router
  .route("/contacts")
  .post(createContact)
  .get(getContacts)
  .put(updateContactNumber);

export default router;
