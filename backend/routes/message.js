require("dotenv").config();
const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const { authenticateToken } = require("../utilities");

// Route to send a message
router.post("/sendMessage", authenticateToken, async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const sender = req.user.user._id;

    // Create a new message
    const message = new Message({
      sender,
      receiver,
      content,
      timestamp: new Date(),
    });

    await message.save();
    res.status(200).json({ message: "Message sent successfully", message });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getMessages", authenticateToken, async (req, res) => {
  try {
    const { receiverId } = req.query;
    const senderId = req.user.user._id;

    // Fetch messages between sender and receiver
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ timestamp: 1 }); // Sort messages by timestamp

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
