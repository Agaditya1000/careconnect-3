import express from 'express';
import { addMedicalRecord, getUserMedicalRecords } from '../controllers/medicalRecordController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';

const medicalRecordRouter = express.Router();

medicalRecordRouter.post('/add', authUser, upload.single('file'), addMedicalRecord);
medicalRecordRouter.get('/list', authUser, getUserMedicalRecords);

export default medicalRecordRouter;
