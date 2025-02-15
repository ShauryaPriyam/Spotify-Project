import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists!" });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Something went wrong!" });
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Something went wrong!" });
        } else {
          let user = await userModel.create({
            username,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res
            .status(201)
            .json({ success: true, message: "User registered successfully!" });
        }
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User Not Found!" });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong!" });

    let token = generateToken(user);
    res.cookie("token", token);
    res
      .status(202)
      .json({ success: true, user, message: "Login Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "");
  res.json({
    success: true,
    message: "User Logout",
  });
};

export const profile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const saveToPlaylist = async (req, res) => {
  const user = await userModel.findById(req.user._id);

  if (user.playlist.includes(req.params.id)) {
    const index = user.playlist.indexOf(req.params.id);

    user.playlist.splice(index, 1);

    await user.save();

    return res.json({
      message: "Removed from playlist",
    });
  }

  user.playlist.push(req.params.id);

  await user.save();

  return res.json({
    message: "added to playlist",
  });
};
