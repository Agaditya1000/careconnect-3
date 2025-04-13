import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGenerativeModel = () => {
  return genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro-latest", // Updated model name
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.9,
    }
  });
};

export const initialContext = [
  {
    role: "user",
    parts: [{ 
      text: "You are CareConnect, a helpful healthcare assistant. Provide concise, empathetic responses. For medical advice, always recommend consulting a healthcare professional. Keep responses under 3 sentences unless more detail is explicitly requested." 
    }]
  },
  {
    role: "model",
    parts: [{ 
      text: "Understood! I'm CareConnect, your healthcare assistant. I'll provide helpful information while reminding you to consult professionals for medical advice. How can I help you today?" 
    }]
  }
];