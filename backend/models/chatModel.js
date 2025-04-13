import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userMessage: { 
    type: String, 
    required: [true, "User message is required"],
    trim: true,
    minlength: 1
  },
  botResponse: { 
    type: String, 
    required: [true, "Bot response is required"],
    trim: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    index: true 
  }
}, {
  timestamps: true
});

// Add text index for search functionality
chatSchema.index({ userMessage: "text", botResponse: "text" });

export default mongoose.model("Chat", chatSchema);