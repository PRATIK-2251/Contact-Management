const express = require("express");
const { route } = require("./contactRoutes");

const router = express.Router();

router.post("/register", (request, response) => {
  response.json({ message: "Register the user" });
});

router.post("/login", (request, response) => {
  response.json({ message: "Login the user" });
});

router.get("/current", (request, response) => {
  response.json({ message: "Current user information" });
});

module.exports = router;
