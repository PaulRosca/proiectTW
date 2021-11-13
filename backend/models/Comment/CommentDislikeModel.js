import mongoose from "mongoose";

const CommentDislikeSchema = mongoose.Schema({
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("CommentDislike", CommentDislikeSchema);
