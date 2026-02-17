import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard, ambulanceAdmin, ambulanceCancel, ambulanceApprove, labAdmin, labCancel, labConfirm } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)
adminRouter.get("/ambulance", authAdmin, ambulanceAdmin)
adminRouter.post("/cancel-ambulance", authAdmin, ambulanceCancel)
adminRouter.post("/approve-ambulance", authAdmin, ambulanceApprove)
adminRouter.get("/lab-bookings", authAdmin, labAdmin)
adminRouter.post("/cancel-lab", authAdmin, labCancel)
adminRouter.post("/confirm-lab", authAdmin, labConfirm)

export default adminRouter;