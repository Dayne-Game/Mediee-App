import express from "express";
const router = express.Router();

import {
  registerOwner,
  authUser,
  getUsers,
  registerStaff,
  deleteUser,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/owner").post(registerOwner);
router.post("/login", authUser);
router.route("/").get(protect, admin, getUsers);
router.route("/staff").post(protect, admin, registerStaff);
router
  .route("/id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById);

export default router;
