import mongoose from "mongoose";

const Schema= mongoose.Schema

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  thumbnail: {
    id: String,
    url: String,
  },
  audio: {
    id: String,
    url: String,
  },

  album: {
    type: String,
    required: true,
  },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, 
    ref: "User" }],
},
{
  timestamps: true,
})

const songModel = mongoose.model("Song", songSchema);

export default songModel;