import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @DESC    GET ALL USERS
// @ROUTE   GET /api/users
// @ACCESS  PRIVATE/ADMIN
const getUsers = asyncHandler(async (req, res) => {
  var re = new RegExp(req.query.keyword, "i");

  if (req.user.isOwner === true) {
    const staffUsers = await User.find({ owner: req.user._id })
      .or([{ fname: { $regex: re } }, { lname: { $regex: re } }])
      .select("-password");
    res.json(staffUsers);
  } else if (req.user.isAdmin === true && req.user.isOwner === false) {
    const adminStaff = await User.find({ owner: req.user.owner })
      .or([{ fname: { $regex: re } }, { lname: { $regex: re } }])
      .select("-password");
  } else {
    res.status(401);
    throw new Error("You don't have the permission to do this!");
  }
});

// @DESC    GET USER BY ID
// @ROUTE   GET /api/users/:id
// @ACCESS  PRIVATE / ADMIN
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @DESC    AUTH USER & GET TOKEN
// @ROUTE   POST /api/users/login
// @ACCESS  PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      profile_image: user.profile_image,
      resthome_name: user.resthome_name,
      email: user.email,
      role: user.role,
      isOwner: user.isOwner,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or Password");
  }
});

// @DESC    REGISTER OWNER (COMPANY)
// @ROUTE   POST /api/users/owner
// @ACCESS  PUBLIC
const registerOwner = asyncHandler(async (req, res) => {
  const { fname, lname, profile_image, resthome_name, email, password } =
    req.body;

  if (
    fname === "" ||
    fname === null ||
    lname === "" ||
    lname === null ||
    email === "" ||
    email === null ||
    password === "" ||
    password === null ||
    resthome_name === "" ||
    resthome_name === null
  ) {
    res.status(400);
    throw new Error("Invalid Data. Make sure the fields are NOT empty.");
  }

  // CHECK IF USER EMAIL ALL READY EXISTS
  const userEmailExists = await User.findOne({ email });

  if (userEmailExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // CHECK PROFILE IMAGE ISN'T EMPTY
  var profile_image_path = "";

  if (profile_image === "" || profile_image === null) {
    profile_image_path = `/uploads/sample.png`;
  } else {
    profile_image_path = profile_image;
  }

  // CREATE OWNER
  const owner = await User.create({
    fname,
    lname,
    profile_image: profile_image_path,
    resthome_name,
    email,
    password,
    role: "Care Facility Owner",
    isOwner: true,
    isAdmin: true,
  });

  if (owner) {
    res.status(201).json({
      _id: owner._id,
      fname: owner.fname,
      lname: owner.lname,
      profile_image: owner.profile_image,
      resthome_name: owner.resthome_name,
      email: owner.email,
      role: owner.role,
      isOwner: owner.isOwner,
      isAdmin: owner.isAdmin,
      token: generateToken(owner._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Owner Data");
  }
});

// @DESC    REGISTER STAFF MEMBER
// @ROUTE   POST /api/users/staff
// @ACCESS  PRIVATE / ADMIN
const registerStaff = asyncHandler(async (req, res) => {
  const {
    fname,
    lname,
    profile_image,
    resthome_name,
    email,
    password,
    role,
    isAdmin,
  } = req.body;

  if (
    fname === "" ||
    fname === null ||
    lname === "" ||
    lname === null ||
    email === "" ||
    email === null ||
    role === "" ||
    role === null ||
    password === null ||
    password === "" ||
    resthome_name === "" ||
    resthome_name === null
  ) {
    res.status(400);
    throw new Error("Invalid Owner Data");
  }

  // CHECK IF USER EMAIL ALL READY EXISTS
  const userEmailExists = await User.findOne({ email });

  if (userEmailExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // CHECK PROFILE IMAGE ISN'T EMPTY
  var profile_image_path = "";

  if (profile_image === "" || profile_image === null) {
    profile_image_path = `/uploads/sample.png`;
  } else {
    profile_image_path = profile_image;
  }

  if (req.user.isOwner === true) {
    const newStaff = await User.create({
      fname,
      lname,
      profile_image: profile_image_path,
      resthome_name,
      email,
      password,
      role,
      owner: req.user._id,
      isAdmin,
    });

    const staff = await newStaff.save();
    res.json(staff);
  } else if (req.user.isAdmin === true && req.user.isOwner === false) {
    const newStaff = await User.create({
      fname,
      lname,
      profile_image: profile_image_path,
      resthome_name,
      email,
      password,
      role,
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

// @DESC    UPDATE USER
// @ROUTE   /api/users/:id
// @ACCESS  PRIVATE / ADMIN
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.profile_image = req.body.profile_image || user.profile_image;
    user.resthome_name = req.body.resthome_name || user.resthome_name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      profile_image: updatedUser.profile_image,
      resthome_name: updatedUser.resthome_name,
      email: updatedUser.email,
      role: updatedUser.role,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @DESC    DELETE USER
// @ROUTE   /api/users/:id
// @ACCESS  PRIVATE / ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  getUsers,
  getUserById,
  authUser,
  registerOwner,
  registerStaff,
  updateUser,
  deleteUser,
};
