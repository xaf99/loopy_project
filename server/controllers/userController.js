const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

//@desc Register User
//route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, contactNo } = req.body;
  if (!fullName || !email || !password || !contactNo) {
    res.status(400);
    throw new Error("All fields are mandotary");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exist");
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  const userCart = await Cart.create();
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    contactNo,
    cart_id: userCart._id,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      contactNo: user.contactNo,
      message: "User Registered",
    });
  } else {
    res.status(400);
    throw new Error("User Data is not valid");
  }
});

//@desc Login User
//route POST /api/users/current
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ message: "All fields are mandotary" });
  }
  const user = await User.findOne({ email });
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          fullName: user.fullName,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    );
    user.password = null;
    res.status(200).json({ user, accessToken, message: "Logged in" });
  } else {
    res.status(401);
    throw new Error("Email or password not valid!");
  }
});

//@desc Update User Information
//route PUT /api/users/updateUser
//@access private

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { fullName, email, contactNo } = req.body;
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { fullName, email, contactNo },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

module.exports = { loginUser, registerUser, updateUser };
