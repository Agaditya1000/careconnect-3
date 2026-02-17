import medicineModel from "../models/medicineModel.js";

// Add Medicine
const addMedicine = async (req, res) => {
    try {
        const { userId, name, dosage, time, frequency, notes } = req.body;

        const medicineData = {
            userId,
            name,
            dosage,
            time,
            frequency,
            notes,
            date: Date.now()
        }

        const newMedicine = new medicineModel(medicineData);
        await newMedicine.save();

        res.json({ success: true, message: "Medicine Reminder Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get User Medicines
const getUserMedicines = async (req, res) => {
    try {
        const { userId } = req.body;
        const medicines = await medicineModel.find({ userId });
        res.json({ success: true, medicines });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Delete Medicine
const deleteMedicine = async (req, res) => {
    try {
        const { id } = req.body; // Expecting medicine ID directly or in body
        // Note: ID usually comes from params or body. Let's assume body for now to match pattern.
        await medicineModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Medicine Reminder Deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addMedicine, getUserMedicines, deleteMedicine };
