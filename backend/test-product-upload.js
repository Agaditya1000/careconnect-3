import jwt from 'jsonwebtoken';
import { Blob } from 'buffer';

const testAPI = async () => {
    const secret = "greatstack";
    const email = "admin@example.com";
    const password = "agaditya1000";
    const token = jwt.sign(email + password, secret);

    console.log("Forged Token:", token);

    const formData = new FormData();
    formData.append("name", "Test Product");
    formData.append("description", "Test Description");
    formData.append("price", "100");
    formData.append("category", "Essentials");

    // Minimal 1x1 Transparent PNG
    const pngBuffer = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // Header
        0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 dimensions
        0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, // 8-bit, RGBA
        0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54, // IDAT
        0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01, 0x0d, // Data
        0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82 // IEND
    ]);

    const blob = new Blob([pngBuffer], { type: 'image/png' });
    formData.append("image", blob, "test_image.png");

    try {
        console.log("--- Testing Add (With Token + Valid PNG) ---");
        const response = await fetch('http://localhost:4000/api/product/add', {
            method: 'POST',
            headers: {
                'aToken': token
            },
            body: formData
        });

        console.log("Add Status:", response.status);
        const text = await response.text();
        console.log("Add Response:", text);
    } catch (error) {
        console.error("Add Request Failed:", error);
    }
};

testAPI();
