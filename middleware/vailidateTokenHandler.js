const { response } = require("express");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  // console.log("Request ---> ", req.headers);
  let token;
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send({ message: "Token is not provided" });
  } else if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log(decoded);
      // If the token is valid, you can access the decoded information in the 'decoded' variable
      // You may want to store this information in the request for further use
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Token is");
  }
});

module.exports = validateToken;
