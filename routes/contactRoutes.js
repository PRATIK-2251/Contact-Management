const express = require("express");
const router = express.Router();

// GET all contact
router.route("/").get((request, response) => {
  response.status(200).send({ message: "Gel all contacts" });
});

// GET single contact
router.route("/:id").get((request, response) => {
  response
    .status(200)
    .send({ message: `Single contact is get ${request.params.id}` });
});

router.route("/").post((request, response) => {
  response.status(201).send({ message: "Created contact" });
});

router.route("/:id").put((request, response) => {
  response
    .status(200)
    .send({ message: `Update contact of id is  ${request.params.id}` });
});

router.route("/:id").delete((request, response) => {
  response
    .status(200)
    .send({ message: `Deleted contact is ${request.params.id}` });
});

module.exports = router;
