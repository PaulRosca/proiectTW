import { deleteFile, getFileStream, uploadFile } from "./ibmCloud.js";
import fs, { unlinkSync } from "fs";
import User from "../models/UserModel.js";
export const setProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File missing or invalid!" });
    }
    const fileStream = fs.createReadStream(req.file.path);
    await uploadFile(req.file.filename, fileStream);
    const user = await User.findById(req.user.id);
    if (user.profilePicture) {
      await deleteFile(user.profilePicture);
    }
    user.profilePicture = req.file.filename;
    await user.save();
    unlinkSync(req.file.path);
    return res.status(200).json({
      message: "Successfully set the profile picture!",
      profilePicture: req.file.filename,
    });
  } catch (error) {
    unlinkSync(req.file.path);
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
    if (!user.profilePicture) {
      return res
        .status(404)
        .json({ message: "User doesn't have a profile picture!" });
    }
    getFileStream(user.profilePicture)
      .on("error", (err) => {
        return res.status(500).json({ message: err.message });
      })
      .pipe(res)
      .on("error", (err) => {
        return res.status(500).json({ message: err.message });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
