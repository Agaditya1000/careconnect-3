import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import ambulanceRoutes from "./routes/ambulanceRoutes.js";
import { labBookingRouter } from "./routes/labBookingRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Initialize connections
connectDB();
connectCloudinary();

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API endpoints (ensure no trailing slashes in route definitions)
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/chat", chatbotRoutes);
app.use("/api/ambulance", ambulanceRoutes);
app.use("/api/lab-bookings", labBookingRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    message: 'API is working',
    timestamp: new Date().toISOString(),
    allowedOrigins
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.url
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      success: false,
      message: 'CORS policy: Origin not allowed',
      allowedOrigins
    });
  }

  res.status(500).json({ 
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
 
});