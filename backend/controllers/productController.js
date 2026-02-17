import validator from "validator";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// API for adding product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const imageFile = req.file;

        console.log("Adding Product Request Received");
        console.log("Body:", req.body);
        console.log("File:", req.file);

        if (!name || !description || !price || !category) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!imageFile) {
            console.log("No image file found!");
            return res.json({ success: false, message: "No Image File" });
        }

        // Upload image to cloudinary
        const absolutePath = path.resolve(imageFile.path);
        console.log("Uploading file from:", absolutePath);

        const imageUpload = await cloudinary.uploader.upload(absolutePath, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            image: imageUrl,
            date: Date.now()
        }

        const newProduct = new productModel(productData);
        await newProduct.save();

        res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for listing products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addProduct, listProducts, removeProduct };
