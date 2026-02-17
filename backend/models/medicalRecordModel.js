import mongoose from 'mongoose'

const medicalRecordSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'Lab Report', 'Prescription'
    title: { type: String, required: true },
    doctor: { type: String },
    date: { type: Date, required: true },
    fileUrl: { type: String },
    summary: { type: String },
    createdAt: { type: Number, required: true }
})

const medicalRecordModel = mongoose.models.medicalRecord || mongoose.model('medicalRecord', medicalRecordSchema)

export default medicalRecordModel
