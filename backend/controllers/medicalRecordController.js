import medicalRecordModel from "../models/medicalRecordModel.js";
import { v2 as cloudinary } from "cloudinary";

// Add Medical Record
const addMedicalRecord = async (req, res) => {
    try {
        const { userId, type, title, doctor, date, summary } = req.body;
        const file = req.file;

        if (!title || !type || !date) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Upload file to cloudinary (if provided)
        let fileUrl = "";
        if (file) {
            const upload = await cloudinary.uploader.upload(file.path, { resource_type: "auto" });
            fileUrl = upload.secure_url;
        }

        const recordData = {
            userId,
            type,
            title,
            doctor,
            date: new Date(date),
            summary,
            fileUrl,
            createdAt: Date.now()
        }

        const newRecord = new medicalRecordModel(recordData);
        await newRecord.save();

        res.json({ success: true, message: "Medical Record Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get User Medical Records
const getUserMedicalRecords = async (req, res) => {
    try {
        const { userId } = req.body;
        const records = await medicalRecordModel.find({ userId }).sort({ date: -1 });
        res.json({ success: true, records });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addMedicalRecord, getUserMedicalRecords };
