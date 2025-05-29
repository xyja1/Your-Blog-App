import express from "express";

import multer from "multer";
import { registerController, loginController } from "../controllers/authController.js";
import { getUserDetails, updateUser, deleteUser } from "../controllers/userController.js";
import { authentication } from "../middleware/auth.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Authentication
router.post("/signup", registerController);
router.post("/login", loginController);

// User routes
router.get("/users/:id", authentication, getUserDetails);
router.put("/update-user", authentication, upload.single("img"), updateUser);
router.delete("/delete-user", authentication, deleteUser);

export default router;
