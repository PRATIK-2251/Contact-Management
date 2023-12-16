const express = require("express");
const router = express.Router();

router.route("/").get((request, response) => {
  response.status(200).send({ message: "Welcome to API" });
});

module.exports = router;
