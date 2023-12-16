const express = require("express");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (request, response) => {
  response.status(200).send("Welcome to API");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
