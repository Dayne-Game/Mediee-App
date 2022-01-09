import express from "express";
const router = express.Router();

import {
  getResidents,
  registerResident,
  deleteResident,
} from "../controllers/residentController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getResidents)
  .post(protect, admin, registerResident);
router.route("/:id").delete(protect, admin, deleteResident);

export default router;
