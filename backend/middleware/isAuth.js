import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(402)
        .json({ success: false, message: "Something Went  Wrong!" });
    let verify = jwt.verify(token, process.env.JWT_KEY);
    if (!verify)
      return res
        .status(402)
        .json({ success: false, message: "Session expires" });
     req.user =await userModel.findById(verify.id)  
     next() 
  } catch (err) {
    res
        .status(500)
        .json({ success: false, message: "Something Went  Wrong!" });
  }
};
