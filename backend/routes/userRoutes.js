import express from "express";
const router = express.Router();

import {
  registerOwner,
  getUsers,
  authUser,
  registerStaff,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/owner").post(registerOwner);
router.post("/login", authUser);
router.route("/").get(protect, admin, getUsers);
router.route("/staff").post(protect, admin, registerStaff);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;
