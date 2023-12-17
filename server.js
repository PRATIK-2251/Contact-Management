const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

// if we need to accept body, then we need body parser
app.use(express.json());
app.get("/", (request, response) => {
  response.send("<h1>Contact Mangement API is running</h1>");
});

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
