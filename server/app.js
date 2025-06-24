const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
//Load file config mongoDB riêng
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => res.json("Chào đằng ấy..."));

// Connect MongoDB
connectDB();
// user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist Routes
const artistsRoutes = require("./routes/artist");
app.use("/api/artists/", artistsRoutes);

// Albums Routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums/", albumRoutes);

// Songs Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs/", songRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));