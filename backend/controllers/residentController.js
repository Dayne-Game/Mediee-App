import asyncHandler from "express-async-handler";
import Resident from "../models/residentModel.js";

// @desc    Fetch All Residents associated to the logged in user
// @route   Get /api/residents
// @access  Private
const getResidents = asyncHandler(async (req, res) => {
  if (req.user.isOwner === true) {
    const residents = await Resident.find({ user: req.user.id });
    res.json(residents);
  } else if (req.user.isOwner === false) {
    const residents = await Resident.find({ user: req.user.owner });
    res.json(residents);
  } else {
    res.status(400).send("Residents not Found");
  }
});

// @DESC    CREATE A RESIDENT
// @ROUTE   POST /api/residents
// @ACCESS  PRIVATE / ADMIN
const registerResident = asyncHandler(async (req, res) => {
  const { name, nhi, dob, gender, height, weight, bloodtype } = req.body;

  if (req.user.isOwner === true) {
    const newResident = await Resident.create({
      user: req.user.id,
      name,
      nhi,
      dob,
      gender,
      height,
      weight,
      bloodtype,
    });

    const resident = await newResident.save();
    res.json(resident);
  } else if (req.user.isAdmin === true && req.user.isOwner === false) {
    const newResident = await Resident.create({
      user: req.user.owner,
      name,
      nhi,
      dob,
      gender,
      height,
      weight,
      bloodtype,
    });

    const resident = await newResident.save();
    res.json(resident);
  } else {
    res.status(400);
    throw new Error("Invalid Resident data");
  }
});

export { getResidents, registerResident };
