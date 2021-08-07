import express from "express";
const router = express.Router();

import {
  getResidents,
  registerResident,
} from "../controllers/residentController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getResidents)
  .post(protect, admin, registerResident);

export default router;
