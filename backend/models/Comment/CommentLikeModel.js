import mongoose from "mongoose";

const CommentLikeSchema = mongoose.Schema({
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("CommentLike", CommentLikeSchema);
