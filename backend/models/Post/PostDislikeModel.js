import mongoose from "mongoose";

const PostDislikeSchema = mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("PostDislike", PostDislikeSchema);
