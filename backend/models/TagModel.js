import mongoose from "mongoose";

export const TagSchema = mongoose.Schema({
  content: { type: String, required: true, unique: true },
  questionsCount: { type: Number, default: 0 },
});

export default mongoose.model("Tag", TagSchema);
