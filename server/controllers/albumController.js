const Album = require("../models/Album");

exports.createAlbum = async (req, res) => {
    try {
        const newAlbum = new Album({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
        });
        const savedAlbum = await newAlbum.save();
        return res.status(200).json({ success: true, album: savedAlbum });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
};

exports.getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) return res.status(404).json({ success: false, msg: "Album not found" });
        return res.status(200).json({ success: true, album });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find().sort({ createdAt: 1 });
        return res.status(200).json({ success: true, album: albums });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

exports.updateAlbum = async (req, res) => {
    try {
        const updated = await Album.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                imageUrl: req.body.imageUrl,
            },
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ success: false, msg: "Album not found" });
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message });
    }
};

exports.deleteAlbum = async (req, res) => {
    try {
        const deleted = await Album.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, msg: "Album not found" });
        return res.status(200).json({ success: true, msg: "Deleted successfully", data: deleted });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};