import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { check, validationResult } from "express-validator";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      owner: user.owner,
      isOwner: user.isOwner,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @DESC    REGISTER RESTHOME/COMPANY OWNER
// @ROUTE   POST /api/users/owner
// @ACCESS  PUBLIC
const registerOwner = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (
    name === "" ||
    name === null ||
    email === "" ||
    email === null ||
    password === null ||
    password === ""
  ) {
    res.status(400);
    throw new Error("Invalid Owner Data");
  }

  // Get User Email
  const userEmailExists = await User.findOne({ email });

  // Check user email
  if (userEmailExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create Owner
  const owner = await User.create({
    name,
    email,
    role: "Care Facility Owner",
    password,
    isOwner: true,
    isAdmin: true,
  });

  if (owner) {
    res.status(201).json({
      _id: owner._id,
      name: owner.name,
      email: owner.email,
      role: owner.role,
      isOwner: owner.isOwner,
      isAdmin: owner.isAdmin,
      token: generateToken(owner._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Owner data");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  if (req.user.isOwner === true) {
    const staffUsers = await User.find({
      $or: [{ _id: req.user._id }, { owner: req.user._id }],
      ...keyword,
    }).select("-password");
    res.json(staffUsers);
  } else if (req.user.isAdmin === true && req.user.isOwner === false) {
    const adminStaff = await User.find({
      $or: [{ owner: req.user.owner }],
      ...keyword,
    }).select("-password");
    res.json(adminStaff);
  } else {
    res.status(401);
    throw new Error("You don't have the permission to do this!");
  }
});

// @DESC    REGISTER STAFF MEMBER
// @ROUTE   POST /api/users/staff
// @ACCESS  PRIVATE / Admin
const registerStaff = asyncHandler(async (req, res) => {
  const { name, email, role, password, isAdmin } = req.body;

  if (
    name === "" ||
    name === null ||
    email === "" ||
    email === null ||
    role === "" ||
    role === null ||
    password === null ||
    password === ""
  ) {
    res.status(400);
    throw new Error("Invalid Owner Data");
  }

  // Get User Email
  const userEmailExists = await User.findOne({ email });

  // Check user email
  if (userEmailExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (req.user.isOwner === true) {
    const newStaff = await User.create({
      name,
      email,
      role,
      password,
      owner: req.user._id,
      isAdmin,
    });

    const staff = await newStaff.save();
    res.json(staff);
  } else if (req.user.isAdmin === true && req.user.isOwner === false) {
    const newStaff = await User.create({
      name,
      email,
      role,
      password,
      owner: req.user.owner,
      isAdmin,
    });

    const staff = await newStaff.save();
    res.json(staff);
  } else {
    res.status(400);
    throw new Error("Invalid Staff data");
  }
});

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @desc    DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerOwner,
  getUsers,
  authUser,
  registerStaff,
  deleteUser,
  updateUser,
  getUserById,
};
