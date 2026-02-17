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
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import medicineRouter from "./routes/medicineRoute.js";
import medicalRecordRouter from "./routes/medicalRecordRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Initialize connections
connectDB();
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/chat", chatbotRoutes);
app.use("/api/ambulance", ambulanceRoutes);
app.use("/api/lab-bookings", labBookingRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/medicine", medicineRouter);
app.use("/api/medical-record", medicalRecordRouter);

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




app.listen(port, () => console.log(`Server started on PORT:${port}`));