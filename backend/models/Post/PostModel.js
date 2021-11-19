import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
