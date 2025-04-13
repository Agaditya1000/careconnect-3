import React, { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm CareConnect. How can I assist you today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(() => `user_${Math.random().toString(36).substr(2, 9)}`);
  const chatContainerRef = useRef(null);

  // Scroll to the latest message automatically
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending messages
  const sendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage = { text: userInput, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/chat/message", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // If using auth
        },
        body: JSON.stringify({ 
          message: userInput,
          userId: userId 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { 
        text: data.response, 
        sender: "bot" 
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        text: "⚠️ Sorry, I'm having trouble responding. Please try again later.", 
        sender: "bot" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = async () => {
    try {
      await fetch("http://localhost:4000/api/chat/clear", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // If using auth
        },
        body: JSON.stringify({ userId }),
      });
      setMessages([{ 
        text: "Hello! I'm CareConnect. How can I assist you today?", 
        sender: "bot" 
      }]);
    } catch (error) {
      console.error("Clear chat error:", error);
    }
  };

  return (
    <>
      {/* Floating CareConnect Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 z-50"
        aria-label="Open chat"
      >
        {isOpen ? '✖️' : '💬'}
      </button>

      {/* CareConnect Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-lg p-4 border z-50">
          {/* Header with clear button */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-blue-600">CareConnect</h3>
            <div>
              <button 
                onClick={clearChat}
                className="text-xs text-gray-500 hover:text-blue-600 mr-2"
                title="Clear conversation"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-red-500"
                aria-label="Close chat"
              >
                ✖️
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef} 
            className="h-64 overflow-y-auto mb-2 border-b p-2 space-y-2"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="p-3 rounded-lg bg-gray-100 text-gray-800 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className={`px-4 py-2 rounded-r ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;