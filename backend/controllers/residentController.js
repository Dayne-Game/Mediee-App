import asyncHandler from "express-async-handler";
import Resident from "../models/residentModel.js";

// @desc    Fetch All Residents associated to the logged in user
// @route   Get /api/residents
// @access  Private
const getResidents = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Resident.countDocuments({ ...keyword });

  if (req.user.isOwner === true) {
    const residents = await Resident.find({ $or: [{ user: req.user.id }], ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ residents, page, pages: Math.ceil(count / pageSize) });
  } else if (req.user.isOwner === false) {
    const residents = await Resident.find({ $or: [{ user: req.user.owner }], ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ residents, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(400).send("Residents not Found");
  }
});

// @DESC    CREATE A RESIDENT
// @ROUTE   POST /api/residents
// @ACCESS  PRIVATE / ADMIN
const registerResident = asyncHandler(async (req, res) => {
  const { name, nhi, dob, gender, height, weight, bloodtype } = req.body;

  if (name === "" || name === null || nhi === "" || nhi === null || dob === "" || dob === null || gender === null || gender === "") {
    res.status(400);
    throw new Error("Invalid Resident Data");
  }

  const residentExists = await Resident.findOne({ nhi });

  if (residentExists) {
    res.status(400);
    throw new Error("Resident Already Exists");
  }

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

// @desc    Delete user
// @desc    DELETE /api/resident/:id
// @access  Private/Admin
const deleteResident = asyncHandler(async (req, res) => {
  const resident = await Resident.findById(req.params.id);

  if (resident) {
    await resident.remove();
    res.json({ message: "Resident removed" });
  } else {
    res.status(404);
    throw new Error("Resident not found");
  }
});

export { getResidents, deleteResident, registerResident };
