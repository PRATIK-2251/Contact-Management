const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register user
//@route POST /api/users/register
//@access pulic
const registerUser = asyncHandler(async (request, response) => {
  const { username, email, password } = request.body;
  if (!username || !email || !password) {
    response.status(400);
    throw new Error("All fields are mandatory");
  }

  // Check if user with the given email already exists
  const userAvailable = await User.findOne({ email });

  // console.log("User available or not", userAvailable);
  if (userAvailable) {
    response.status(400);
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password --> ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("User created --> ", user);

  if (user) {
    response.status(201).send({
      message: "User created",
      data: {
        id: user._id,
        user: user.username,
        email,
      },
    });
  } else {
    response.status(400);
    throw new Error("data is not valid");
  }

  response.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access pulic
const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(401);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    response.status(401);
    throw new Error("User not found");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    response.status(200).send({ accessToken });
  } else {
    response.status(401);
    throw new Error("email and password is not valid");
  }
});

//@desc Current user
//@route POST /api/users/login
//@access private
const currentUser = asyncHandler(async (request, response) => {
  response.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
