const express = require("express");
const {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

// Optimize way
// GET all contact and POST contact
router.route("/").get(getContact).post(createContact);

// GET single contact
router
  .route("/:id")
  .get(getSingleContact)
  .put(updateContact)
  .delete(deleteContact);

// Regular Way
// // GET all contact
// router.route("/").get(getContact);

// // GET single contact
// router.route("/:id").get(getSingleContact);

// //POST
// router.route("/").post(createContact);

// // PUT
// router.route("/:id").put(updateContact);

// // DELETE
// router.route("/:id").delete(deleteContact);

module.exports = router;
