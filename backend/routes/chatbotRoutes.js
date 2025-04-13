import express from 'express';
import { handleChatMessage, clearChatHistory } from '../controllers/chatbotController.js';

const router = express.Router();

// POST /api/chat/message - Send a message to the chatbot
router.post('/message', handleChatMessage);

// POST /api/chat/clear - Clear chat history
router.post('/clear', clearChatHistory);

// GET /api/chat/models - List available models (for debugging)
router.get('/models', async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const result = await genAI.listModels();
    res.json({ success: true, models: result });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

export default router;