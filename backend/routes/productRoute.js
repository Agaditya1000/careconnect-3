import express from 'express';
import { addProduct, listProducts, removeProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';

const productRouter = express.Router();

productRouter.post('/add', authAdmin, upload.single('image'), addProduct);
productRouter.post('/remove', authAdmin, removeProduct);
productRouter.get('/list', listProducts);

export default productRouter;
