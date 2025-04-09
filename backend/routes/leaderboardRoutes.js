const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

// 📌 [GET] Fetch All Leaderboard Entries
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 [POST] Add a New Score to Leaderboard
router.post("/", async (req, res) => {
  const { username, score } = req.body;

  if (!username || !score) {
    return res.status(400).json({ error: "Username and score are required" });
  }

  try {
    const newEntry = new Leaderboard({ username, score });
    await newEntry.save();
    res.status(201).json({ message: "Score added to leaderboard", newEntry });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
