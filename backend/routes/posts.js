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
  getPosts,
  getComments,
  searchTag,
  deleteComment,
  deletePost,
  hottestTags,
  editComment,
  editPost,
} from "../controllers/posts.js";
import { auth, extractUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/createTag", auth, createTag);
router.get("/tags", searchTag);
router.get("/hotTags", hottestTags);
router.post("/createPost", auth, createPost);
router.patch("/editPost/:id", auth, editPost);
router.delete("/deletePost/:id", auth, deletePost);
router.get("/getPost/:id", extractUser, getPost);
router.post("/likePost/:id", auth, likePost);
router.post("/dislikePost/:id", auth, dislikePost);
router.post("/addComment/:id", auth, addComment);
router.patch("/editComment/:id", auth, editComment);
router.delete("/deleteComment/:id", auth, deleteComment);
router.post("/likeComment/:id", auth, likeComment);
router.post("/dislikeComment/:id", auth, dislikeComment);
router.get("/getPosts", getPosts);
router.get("/getPost/:id/comments", extractUser, getComments);

export default router;
