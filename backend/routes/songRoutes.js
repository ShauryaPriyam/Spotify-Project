import express from "express";
import {
  createAlbum,
  getAllAlbum,
  addSong,
  addThumbnail,
  getAllSongs,
  getAllSongbyAlbum,
  deleteSong,
  getSingleSong,
} from "../controllers/songController.js";
import { isAuth } from "../middleware/isAuth.js";
import uploadFile from "../middleware/muter.js";

const router = express.Router();

router.post("/Album/create", isAuth, uploadFile, createAlbum);
router.get("/Album/all", getAllAlbum);
router.post("/Song/add", isAuth, uploadFile, addSong);
router.post("/Thumbnail/:id", isAuth, uploadFile, addThumbnail);
router.get("/Song/all", getAllSongs);
router.get("/Album/:id",getAllSongbyAlbum);
router.delete("/Song/delete/:id", isAuth, deleteSong);
router.get("/Song/single/:id",getSingleSong);

export default router;
