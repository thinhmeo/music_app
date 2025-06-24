const Artist = require('../models/Artist');

exports.createArtist = async (req, res) => {
    try {
        const newArtist = new Artist(req.body);
        const savedArtist = await newArtist.save();
        return res.status(200).json({ success: true, artist: savedArtist });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
}
exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, artists });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}
exports.getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ success: false, msg: "Artist not found" });
        return res.status(200).json({ success: true, artist });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}
exports.updateArtist = async (req, res) => {
    try {
        const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedArtist) return res.status(404).json({ success: false, msg: "Not found" });
        return res.status(200).json({ success: true, artist: updatedArtist });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
}
exports.deleteArtist = async (req, res) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
        if (!deletedArtist) return res.status(404).json({ success: false, msg: "Not found" });
        return res.status(200).json({ success: true, msg: "Deleted", data: deletedArtist });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}