import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    descritpion: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    return next();
  });
});

export default mongoose.model("User", UserSchema);
