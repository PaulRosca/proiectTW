import Tag from "../models/TagModel.js";
import Post from "../models/Post/PostModel.js";
import PostLike from "../models/Post/PostLikeModel.js";
import PostDislike from "../models/Post/PostDislikeModel.js";
import Comment from "../models/Comment/CommentModel.js";
import CommentLike from "../models/Comment/CommentLikeModel.js";
import CommentDislike from "../models/Comment/CommentDislikeModel.js";
import mongoose from "mongoose";
const postsPageSize = 6;
const commentsPageSize = 6;
const tagsPageSize = 4;

export const createTag = async (req, res) => {
  try {
    const tag = await new Tag(req.body).save();
    return res.status(201).json({ message: "Tag created successfully!", tag });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const hottestTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ questionsCount: -1 }).limit(50).exec();
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(404).json({ error });
  }
};
export const searchTag = async (req, res) => {
  try {
    const query = req.query.search;
    let tags;
    if (query && query.length > 1) {
      tags = await Tag.collection
        .aggregate([
          {
            $search: {
              index: "default",
              autocomplete: {
                query,
                path: "content",
              },
            },
          },
          {
            $limit: tagsPageSize,
          },
          {
            $sort: {
              questionsCount: -1,
            },
          },
        ])
        .toArray();
    } else {
      tags = await Tag.find()
        .sort({ questionsCount: -1 })
        .limit(tagsPageSize)
        .exec();
    }
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (new Set(tags).size !== tags.length) {
      throw new Error("Duplicate tags!");
    }
    const post = await new Post({
      title,
      content,
      tags,
      createdBy: req.user.id,
    }).save();
    for (const tag of tags) {
      await Tag.updateOne({ _id: tag }, { $inc: { questionsCount: 1 } });
    }
    return res
      .status(201)
      .json({ message: "Post created successfully!", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Post doesn't exist!" });
    }
    if (!post.createdBy.equals(req.user.id)) {
      return res.status(403).json({ message: "Post doesn't belong to user!" });
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    if (tags) {
      post.tags = tags;
    }
    post.save();
    return res.status(200).json({ message: "Successfully updated post", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Post doesn't exist!" });
    }
    if (!post.createdBy.equals(req.user.id)) {
      return res.status(403).json({ message: "Post doesn't belong to user!" });
    }
    await Post.findByIdAndDelete(req.params.id);
    for (const tag of post.tags) {
      await Tag.updateOne({ _id: tag }, { $inc: { questionsCount: -1 } });
    }
    await PostLike.deleteMany({
      post: post._id,
    });
    await PostDislike.deleteMany({
      post: post._id,
    });
    const comments = await Comment.find({ post: post._id })
      .select("-content -user -likeCount -dislikeCount -post")
      .exec();
    for (const comment of comments) {
      await Comment.findByIdAndDelete(comment);
      await CommentLike.deleteMany({
        comment,
      });
      await CommentDislike.deleteMany({
        comment,
      });
    }
    return res
      .status(200)
      .json({ message: `Successfully deleted post with id ${post._id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { sorting, commentID } = req.query;
    const sorting_r = sorting === "asc" ? 1 : -1;
    let commentID_r = null;
    try {
      commentID_r = mongoose.Types.ObjectId(commentID);
    } catch (err) {}

    const filter = commentID_r
      ? sorting_r === 1
        ? { _id: { $gt: commentID_r } }
        : { _id: { $lt: commentID_r } }
      : {};
    filter.post = req.params.id;

    let comments = await Comment.find(filter)
      .lean()
      .sort({ _id: sorting_r })
      .populate("user")
      .limit(commentsPageSize)
      .exec();
    comments = await Promise.all(
      comments.map(async (comment) => {
        comment.liked = false;
        comment.disliked = false;
        if (req.user) {
          const userLike = await CommentLike.findOne({
            comment: comment._id,
            user: req.user.id,
          });
          if (userLike) {
            comment.liked = true;
          } else {
            const userDislike = await CommentDislike.findOne({
              comment: comment._id,
              user: req.user.id,
            });
            if (userDislike) {
              comment.disliked = true;
            }
          }
        }
        return comment;
      })
    );
    const hasComments = comments.length > 0;
    return res.status(200).json({
      comments,
      lastCommentID: hasComments ? comments[comments.length - 1]._id : "same",
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  let { sorting, lastValue, createdBy, tags, lastID } = req.query;
  try {
    let sort;
    let filter;
    let postID = null;
    if (lastID) {
      try {
        postID = mongoose.Types.ObjectId(lastID);
      } catch (err) {}
    }
    switch (sorting) {
      case "date:asc":
        sort = { _id: 1 };
        filter = postID ? { _id: { $gt: postID } } : {};
        break;
      case "date:desc":
        sort = { _id: -1 };
        filter = postID ? { _id: { $lt: postID } } : {};
        break;
      case "rating:asc":
        sort = { rating: 1, _id: -1 };
        filter =
          lastValue && postID
            ? {
                $or: [
                  { rating: { $gt: parseInt(lastValue) } },
                  {
                    rating: parseInt(lastValue),
                    _id: { $lt: postID },
                  },
                ],
              }
            : {};
        break;
      case "rating:desc":
        sort = { rating: -1, _id: -1 };
        filter =
          lastValue && postID
            ? {
                $or: [
                  { rating: { $lt: parseInt(lastValue) } },
                  {
                    rating: parseInt(lastValue),
                    _id: { $lt: postID },
                  },
                ],
              }
            : {};
        break;
      case "views:asc":
        sort = { views: 1, _id: -1 };
        filter =
          lastValue && postID
            ? {
                $or: [
                  { views: { $gt: parseInt(lastValue) } },
                  {
                    views: parseInt(lastValue),
                    _id: { $lt: postID },
                  },
                ],
              }
            : {};
        break;
      case "views:desc":
        sort = { views: -1, _id: -1 };
        filter =
          lastValue && postID
            ? {
                $or: [
                  { views: { $lt: parseInt(lastValue) } },
                  {
                    views: parseInt(lastValue),
                    _id: { $lt: postID },
                  },
                ],
              }
            : {};
        break;
      case "commentCount:asc":
        sort = { commentCount: 1, _id: -1 };
        filter =
          lastValue && postID
            ? {
                $or: [
                  { commentCount: { $gt: parseInt(lastValue) } },
                  {
                    commentCount: parseInt(lastValue),
                    _id: { $lt: postID },
                  },
                ],
              }
            : {};
        break;
      case "commentCount:desc":
        sort = { commentCount: -1, _id: -1 };
        filter =
          lastValue && postID
            ? {
                $or: [
                  { commentCount: { $lt: parseInt(lastValue) } },
                  {
                    commentCount: parseInt(lastValue),
                    _id: { $lt: postID },
                  },
                ],
              }
            : {};
        break;
      default:
        sort = { _id: -1 };
        filter = postID ? { _id: { $lt: postID } } : {};
        break;
    }
    if (createdBy) filter["createdBy"] = { $in: createdBy };
    if (tags) filter["tags"] = { $in: tags.split(",") };
    const posts = await Post.collection
      .aggregate([
        {
          $addFields: {
            rating: {
              $subtract: ["$likeCount", "$dislikeCount"],
            },
          },
        },
        {
          $match: filter,
        },
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy",
          },
        },
        { $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "tags",
            localField: "tags",
            foreignField: "_id",
            as: "tags",
          },
        },

        {
          $sort: sort,
        },
        { $limit: postsPageSize },
        {
          $project: {
            "createdBy.password": 0,
            "createdBy.email": 0,
            "createdBy.profilePicture": 0,
            "createdBy.__v": 0,
            "createdBy.updatedAt": 0,
            "createdBy.createdAt": 0,
            "tags._id": 0,
            "tags.questionsCount": 0,
            "tags.__v": 0,
          },
        },
      ])
      .toArray();

    lastValue = undefined;
    lastID = undefined;
    if (posts.length > 0) {
      lastID = posts[posts.length - 1]._id;
      switch (sorting) {
        case "rating:asc":
          lastValue = posts[posts.length - 1].rating;
          break;
        case "rating:desc":
          lastValue = posts[posts.length - 1].rating;
          break;
        case "views:asc":
          lastValue = posts[posts.length - 1].views;
          break;
        case "views:desc":
          lastValue = posts[posts.length - 1].views;
          break;
        case "commentCount:asc":
          lastValue = posts[posts.length - 1].commentCount;
          break;
        case "commentCount:desc":
          lastValue = posts[posts.length - 1].commentCount;
          break;
        default:
          break;
      }
    } else {
      lastID = "same";
      lastValue = "same";
    }

    return res.status(200).json({
      posts,
      lastID,
      lastValue,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const populatedComment = await Comment.populate(comment, { path: "user" });
    await Post.updateOne({ _id: req.params.id }, { $inc: { commentCount: 1 } });
    return res.status(201).json({ comment: populatedComment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(400).json({ message: "Comment doesn't exist!" });
    }
    if (!comment.user.equals(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Comment doesn't belong to user!" });
    }
    comment.content = content;
    comment.save();
    return res
      .status(200)
      .json({ message: "Comment updated successfully", comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(400).json({ message: "Comment doesn't exist!" });
    }
    if (!comment.user.equals(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Comment doesn't belong to user!" });
    }
    await Comment.findByIdAndDelete(req.params.id);
    await CommentLike.deleteMany({
      comment: comment._id,
    });
    await CommentDislike.deleteMany({
      comment: comment._id,
    });
    await Post.updateOne({ _id: comment.post }, { $inc: { commentCount: -1 } });
    return res.status(200).json({
      message: `Successfully deleted comment with id ${comment._id}!`,
    });
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
