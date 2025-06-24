const Song = require("../models/Song");

exports.createSong = async (req, res) => {
    try {
        const newSong = new Song(req.body);
        const saved = await newSong.save();
        return res.status(200).json({ success: true, song: saved });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
};

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find()
            .sort({ createdAt: -1 })
            .populate("artist")
            .populate("album");
        return res.status(200).json({ success: true, songs });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

exports.getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id)
            .populate("artist")
            .populate("album");
        if (!song) return res.status(404).json({ success: false, msg: "Song not found" });
        return res.status(200).json({ success: true, song });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

exports.updateSong = async (req, res) => {
    try {
        const updated = await Song.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) return res.status(404).json({ success: false, msg: "Not found" });
        return res.status(200).json({ success: true, song: updated });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
};

exports.deleteSong = async (req, res) => {
    try {
        const deleted = await Song.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, msg: "Not found" });
        return res.status(200).json({ success: true, msg: "Deleted", data: deleted });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};
// get songs by artist name
exports.getSongsByArtist = async (req, res) => {
    try {
        const artistName = req.params.artistName;
        const songs = await Song.find({ artist: artistName }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, songs });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};
// get songs by album name
exports.getSongsByAlbum = async (req, res) => {
    try {
        const albumName = req.params.albumName;
        const songs = await Song.find({ album: albumName }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, songs });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

