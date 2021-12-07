import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign({ id: user._id }, config.get("jwtSecret"));
    res.clearCookie("token");
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        descritpion: user.descritpion,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const userData = req.body;
  let user;
  try {
    user = await new User(userData).save();
    const token = jwt.sign({ id: user._id }, config.get("jwtSecret"));
    res.clearCookie("token");
    res.cookie("token", token, { httpOnly: true });
    return res.status(201).json({ message: "Register successful", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try{
  const user = await User.findById(id).select("-password");
  return res.status(200).json(user);
  }
  catch (error){
    return res.status(500).json({ success: false, message: error.message });
  }
};