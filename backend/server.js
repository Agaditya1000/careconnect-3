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

// Middlewares
app.use(cors());
app.use(express.json());

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/chat", chatbotRoutes);
app.use("/api/ambulance", ambulanceRoutes);
app.use("/api/lab-bookings", labBookingRouter); // Updated endpoint

app.get("/", (req, res) => {
  res.send("API Working");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!' 
  });
});


app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    next();
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));