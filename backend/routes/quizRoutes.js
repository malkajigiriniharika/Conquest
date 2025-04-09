const express = require("express");
const Quiz = require("../models/Quiz");
const User = require("../models/User");

const router = express.Router();

// Fetch Quiz Questions
router.get("/", async (req, res) => {
    try {
        const questions = await Quiz.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Submit Quiz Score
router.post("/submit", async (req, res) => {
    try {
        const { userId, score } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.score = score;
        await user.save();

        res.status(200).json({ message: "Score submitted successfully", score });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
