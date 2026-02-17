import mongoose from 'mongoose'

const medicineSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    time: { type: String, required: true },
    frequency: { type: String, required: true },
    notes: { type: String },
    isActive: { type: Boolean, default: true },
    date: { type: Number, required: true }
})

const medicineModel = mongoose.models.medicine || mongoose.model('medicine', medicineSchema)

export default medicineModel
