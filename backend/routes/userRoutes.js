import express from "express";
import {
  loginUser,
  logout,
  registerUser,
  profile,
  saveToPlaylist,
} from "../controllers/userController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/profile", isAuth, profile);
router.post("/song/:id", isAuth, saveToPlaylist);

export default router;
