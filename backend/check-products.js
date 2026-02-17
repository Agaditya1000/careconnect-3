import mongoose from 'mongoose';
import 'dotenv/config';
import productModel from './models/productModel.js';

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
        const products = await productModel.find({});
        console.log(`Found ${products.length} products`);
        console.log(JSON.stringify(products, null, 2));
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

check();
