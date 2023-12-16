const express = require("express");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

// if we need to accept body, then we need body parser
app.use(express.json());
app.get("/", (request, response) => {
  response.send("<h1>Contact Mangement API is running</h1>");
});

app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
