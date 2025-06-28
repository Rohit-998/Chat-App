import { Router } from "express";
import {
  login,
  signup,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,

} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleWare.js";
import multer from "multer";
const authRoutes = Router();
console.log("✅ Auth routes loaded");

const upload = multer({ dest: "uploads/profiles/" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
import { logout } from "../controllers/AuthController.js";



authRoutes.post("/logout", logout);


export default authRoutes;
