const Chat = require('../models/Chat');

// Ensure the names match exactly what you call in the routes
exports.sendMessage = async (req, res) => {
  try {
    const { userId, text } = req.body;
    let chat = await Chat.findOne({ userId });
    if (!chat) chat = new Chat({ userId, messages: [] });

    chat.messages.push({ sender: 'user', text });
    
    // Simple AI Logic
    const aiResponse = "I'm here to support you. Tell me more.";
    chat.messages.push({ sender: 'ai', text: aiResponse });
    
    await chat.save();
    res.json({ history: chat.messages });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.params.userId });
    res.json(chat ? chat.messages : []);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};