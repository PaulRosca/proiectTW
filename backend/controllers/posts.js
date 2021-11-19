import Tag from "../models/TagModel.js";
import Post from "../models/Post/PostModel.js";
import PostLike from "../models/Post/PostLikeModel.js";
import PostDislike from "../models/Post/PostDislikeModel.js";
import Comment from "../models/Comment/CommentModel.js";
import CommentLike from "../models/Comment/CommentLikeModel.js";
import CommentDislike from "../models/Comment/CommentDislikeModel.js";
import mongoose from "mongoose";
const postsPageSize = 6;

export const createTag = async (req, res) => {
  try {
    const tag = await new Tag(req.body).save();
    return res.status(201).json({ message: "Tag created successfully", tag });
  } catch (error) {}
  return res.status(500).json({ message: error.message });
};

export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const postData = { title, content, tags, createdBy: req.user.id };
    const post = await new Post(postData).save();
    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  const { sorting, postID } = req.query;
  try {
    const sorting_r = sorting === "asc" ? 1 : -1;
    let postID_r = null;
    try {
      postID_r = mongoose.Types.ObjectId(postID);
    } catch (err) {}

    const filter = postID_r
      ? sorting_r === 1
        ? { _id: { $gt: postID_r } }
        : { _id: { $lt: postID_r } }
      : {};
    const posts = await Post.find(filter)
      .sort({ _id: sorting_r })
      .populate("createdBy")
      .populate("tags")
      .limit(postsPageSize)
      .exec();
    const hasPosts = posts.length > 0;
    return res.status(200).json({
      posts,
      lastPostID: hasPosts ? posts[posts.length - 1]._id : "same",
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const getPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    })
      .lean()
      .populate("tags")
      .populate("createdBy")
      .exec();
    post.liked = false;
    post.disliked = false;
    if (req.user) {
      const userLike = await PostLike.findOne({
        post: req.params.id,
        user: req.user.id,
      });

      if (userLike) {
        post.liked = true;
      } else {
        const userDislike = await PostDislike.findOne({
          post: req.params.id,
          user: req.user.id,
        });
        if (userDislike) {
          post.disliked = true;
        }
      }
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const addPostLike = async (post, user) => {
  await PostLike({ post, user }).save();
  await Post.updateOne({ _id: post }, { $inc: { likeCount: 1 } });
};
const removePostLike = async (postLike) => {
  await PostLike.findByIdAndDelete(postLike._id);
  await Post.updateOne({ _id: postLike.post }, { $inc: { likeCount: -1 } });
};
const addPostDislike = async (post, user) => {
  await PostDislike({ post, user }).save();
  await Post.updateOne({ _id: post }, { $inc: { dislikeCount: 1 } });
};
const removePostDislike = async (postDislike) => {
  await PostDislike.findByIdAndDelete(postDislike._id);
  await Post.updateOne(
    { _id: postDislike.post },
    { $inc: { dislikeCount: -1 } }
  );
};

export const likePost = async (req, res) => {
  try {
    const userLike = await PostLike.findOne({
      post: req.params.id,
      user: req.user.id,
    });
    const userDislike = await PostDislike.findOne({
      post: req.params.id,
      user: req.user.id,
    });
    if (userDislike) {
      await removePostDislike(userDislike);
    }
    if (userLike) {
      await removePostLike(userLike);
      return res.status(200).json({ success: true, message: "Unliked post!" });
    } else {
      await addPostLike(req.params.id, req.user.id);
      return res.status(200).json({ success: true, message: "Liked post!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const userLike = await PostLike.findOne({
      post: req.params.id,
      user: req.user.id,
    });
    const userDislike = await PostDislike.findOne({
      post: req.params.id,
      user: req.user.id,
    });
    if (userLike) {
      await removePostLike(userLike);
    }
    if (userDislike) {
      await removePostDislike(userDislike);
      return res
        .status(200)
        .json({ success: true, message: "Undisliked post!" });
    } else {
      await addPostDislike(req.params.id, req.user.id);
      return res.status(200).json({ success: true, message: "Disliked post!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const comment = await new Comment({
      user: req.user.id,
      post: req.params.id,
      content: req.body.content,
    }).save();
    await Post.updateOne({ _id: req.params.id }, { $inc: { commentCount: 1 } });
    return res.status(201).json({ comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addCommentLike = async (comment, user) => {
  await CommentLike({ comment, user }).save();
  await Comment.updateOne({ _id: comment }, { $inc: { likeCount: 1 } });
};
const removeCommentLike = async (commentLike) => {
  await CommentLike.findByIdAndDelete(commentLike._id);
  await Comment.updateOne(
    { _id: commentLike.comment },
    { $inc: { likeCount: -1 } }
  );
};
const addCommentDislike = async (comment, user) => {
  await CommentDislike({ comment, user }).save();
  await Comment.updateOne({ _id: comment }, { $inc: { dislikeCount: 1 } });
};
const removeCommentDislike = async (commentDislike) => {
  await CommentDislike.findByIdAndDelete(commentDislike._id);
  await Comment.updateOne(
    { _id: commentDislike.comment },
    { $inc: { dislikeCount: -1 } }
  );
};

export const likeComment = async (req, res) => {
  try {
    const userLike = await CommentLike.findOne({
      comment: req.params.id,
      user: req.user.id,
    });
    const userDislike = await CommentDislike.findOne({
      comment: req.params.id,
      user: req.user.id,
    });
    if (userDislike) {
      await removeCommentDislike(userDislike);
    }
    if (userLike) {
      await removeCommentLike(userLike);
      return res
        .status(200)
        .json({ success: true, message: "Unliked comment!" });
    } else {
      await addCommentLike(req.params.id, req.user.id);
      return res.status(200).json({ success: true, message: "Liked comment!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const dislikeComment = async (req, res) => {
  try {
    const userLike = await CommentLike.findOne({
      comment: req.params.id,
      user: req.user.id,
    });
    const userDislike = await CommentDislike.findOne({
      comment: req.params.id,
      user: req.user.id,
    });
    if (userLike) {
      await removeCommentLike(userLike);
    }
    if (userDislike) {
      await removeCommentDislike(userDislike);
      return res
        .status(200)
        .json({ success: true, message: "Undisliked comment!" });
    } else {
      await addCommentDislike(req.params.id, req.user.id);
      return res
        .status(200)
        .json({ success: true, message: "Disliked comment!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
