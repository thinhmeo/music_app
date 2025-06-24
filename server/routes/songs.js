const express = require("express");
const router = express.Router();
//Dùng controller làm file trung gian để xử lý logic. Controller có các phương thức gọi model để thao tác với database
const songController = require("../controllers/songController");

router.post("/save", songController.createSong);
router.get("/getAll", songController.getAllSongs);
router.get("/getOne/:id", songController.getSongById);
router.put("/update/:id", songController.updateSong);
router.delete("/delete/:id", songController.deleteSong);
router.get("/getByArtist/:artistName", songController.getSongsByArtist);
router.get("/getByAlbum/:albumName", songController.getSongsByAlbum);
module.exports = router;