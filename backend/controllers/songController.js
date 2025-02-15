import songModel from "../models/songModel.js";
import albumModel from "../models/albumModel.js";
import getDataurl from "../utils/generateUri.js";
import cloudinary from "cloudinary";

export const createAlbum = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not admin",
      });
    }

    const { title, description } = req.body;
    const file = req.file;
    // console.log(file);
    const fileUrl = getDataurl(file);

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    const album = await albumModel.create({
      title,
      description,
      thumbnail: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
    });

    res.json({
      success: true,
      message: "Album Created Successfully!",
    });
  } catch (err) {
    console.error("Error creating album:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the album.",
    });
  }
};

export const getAllAlbum = async (req, res) => {
  try {
    const albums = await albumModel.find();

    res.json({
      success: true,
      albums,
    });
  } catch (err) {
    console.error("Error fetching albums:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching albums.",
    });
  }
};

export const addSong = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not admin",
      });
    }

    const { title, description, singer, album } = req.body;
    const file = req.file;
    // console.log(req.file);
    const fileUrl = getDataurl(file);

    // console.log("Uploading file:", fileUrl.content);
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
      resource_type: "video",
    });

    const song = await songModel.create({
      title,
      description,
      singer,
      audio: {
        id: cloud.public_id,
        url: cloud.secure_url,
      },
      album,
    });

    res.json({
      success: true,
      message: "Song Created Successfully!",
    });
  } catch (err) {
    console.error("Error adding song:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding the song.",
    });
  }
};

export const addThumbnail = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not admin",
      });
    }

    const file = req.file;
    const fileUrl = getDataurl(file);

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    const thumbnail = await songModel.findByIdAndUpdate(
      req.params.id,
      {
        thumbnail: {
          id: cloud.public_id,
          url: cloud.secure_url,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Thumbnail Updated Successfully!",
    });
  } catch (err) {
    console.error("Error updating thumbnail:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the thumbnail.",
    });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await songModel.find();

    res.json({
      success: true,
      songs,
    });
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching songs.",
    });
  }
};

export const getSingleSong = async(req,res)=>{
  try{
    const song = await songModel.findById(req.params.id)
    res.json({
      success: true,
      song,
    });
  } catch (err){
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching songs.",
    });
  }
}

export const getAllSongbyAlbum = async (req, res) => {
  try {
    const album = await albumModel.findById(req.params.id);
    const songs = await songModel.find({ album: req.params.id });

    res.json({
      success: true,
      album,
      songs,
    });
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching songs.",
    });
  }
};

export const deleteSong = async (req,res)=>{
  try{
    const song = await songModel.findById(req.params.id).deleteOne()
    res.status(200)
    .json({ message: "Song Deleted" });
  }catch(err){
    console.error("Error fetching songs:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting songs.",
    });
  }
}
