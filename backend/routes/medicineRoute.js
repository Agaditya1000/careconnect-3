import express from 'express';
import { addMedicine, getUserMedicines, deleteMedicine } from '../controllers/medicineController.js';
import authUser from '../middleware/authUser.js';

const medicineRouter = express.Router();

medicineRouter.post('/add', authUser, addMedicine);
medicineRouter.get('/list', authUser, getUserMedicines);
medicineRouter.post('/remove', authUser, deleteMedicine);

export default medicineRouter;
