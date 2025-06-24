const express = require("express");
const router = express.Router();
const albumController = require("../controllers/albumController");

router.post("/save", albumController.createAlbum);
router.get("/getOne/:id", albumController.getAlbumById);
router.get("/getAll", albumController.getAllAlbums);
router.put("/update/:id", albumController.updateAlbum);
router.delete("/delete/:id", albumController.deleteAlbum);

module.exports = router;