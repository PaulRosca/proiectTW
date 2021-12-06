import express from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import {
  getProfilePicture,
  setProfilePicture,
} from "../controllers/profilePictures.js";
const fileFilter = (req, file, cb) => {
  if (/^image\//.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const router = express.Router();
const upload = multer({ dest: "uploads/", fileFilter });
router.post("/", auth, upload.single("profilePicture"), setProfilePicture);
router.get("/user/:id", getProfilePicture);

export default router;
