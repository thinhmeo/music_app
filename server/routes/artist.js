const router = require("express").Router();

const { data } = require("react-router-dom");
//out artis model
const artists = require("../models/Artist");
//controller
const artistController = require("../controllers/artistController");

router.post("/save", artistController.createArtist);
router.get("/getOne/:id", artistController.getArtistById);
router.get("/getAll", artistController.getAllArtists);
router.put("/update/:id", artistController.updateArtist);
router.delete("/delete/:id", artistController.deleteArtist);

module.exports = router;