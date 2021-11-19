import express from "express";
import {
  addComment,
  createPost,
  createTag,
  dislikeComment,
  dislikePost,
  getPost,
  likeComment,
  likePost,
  getPosts
} from "../controllers/posts.js";
import { auth, extractUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/createTag", auth, createTag);
router.post("/createPost", auth, createPost);
router.get("/getPost/:id", extractUser, getPost);
router.post("/likePost/:id", auth, likePost);
router.post("/dislikePost/:id", auth, dislikePost);
router.post("/addComment/:id", auth, addComment);
router.post("/likeComment/:id", auth, likeComment);
router.post("/dislikeComment/:id", auth, dislikeComment);
router.get("/getPosts", getPosts);

export default router;
