const express = require("express");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (request, response) => {
  response.send("<h1>Contact Mangement API is running</h1>");
});

app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
