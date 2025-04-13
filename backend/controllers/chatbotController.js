import { getGenerativeModel, initialContext } from '../config/gemini.js';

// In-memory chat history storage (consider using Redis in production)
const chatHistories = new Map();

export const handleChatMessage = async (req, res) => {
  try {
    const { message, userId = 'default' } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        success: false,
        message: 'Valid message is required' 
      });
    }

    // Initialize or get chat history
    if (!chatHistories.has(userId)) {
      chatHistories.set(userId, [...initialContext]);
    }
    const history = chatHistories.get(userId);

    // Get the model instance
    const model = getGenerativeModel();
    
    // Start chat session with history
    const chat = model.startChat({ history });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Update chat history
    history.push(
      { role: "user", parts: [{ text: message }] },
      { role: "model", parts: [{ text }] }
    );

    // Keep history size manageable (last 10 exchanges)
    if (history.length > 20) {
      chatHistories.set(userId, history.slice(-20));
    }

    res.status(200).json({ 
      success: true,
      response: text 
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    
    let errorMessage = 'Error processing your message';
    let statusCode = 500;
    
    if (error.message.includes('API key not valid')) {
      errorMessage = 'Invalid API configuration';
      statusCode = 401;
    } else if (error.message.includes('model not found')) {
      errorMessage = 'Chat model not available';
      statusCode = 404;
    }

    res.status(statusCode).json({ 
      success: false,
      message: errorMessage,
      error: error.message 
    });
  }
};

export const clearChatHistory = (req, res) => {
  try {
    const { userId = 'default' } = req.body;
    chatHistories.delete(userId);
    
    res.status(200).json({ 
      success: true,
      message: 'Chat history cleared' 
    });
  } catch (error) {
    console.error('Clear history error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to clear history',
      error: error.message 
    });
  }
};