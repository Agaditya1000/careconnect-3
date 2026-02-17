import axios from 'axios';

const testAPI = async () => {
    try {
        console.log("Testing /api/product/list...");
        const response = await axios.get('http://localhost:4000/api/product/list');
        console.log("List response status:", response.status);
        console.log("List data:", response.data);
    } catch (error) {
        console.error("List failed:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
    }

    try {
        console.log("\nTesting /api/product/add (without auth/data)...");
        // This should fail with 401 or similar, but NOT 404 if the route exists
        const response = await axios.post('http://localhost:4000/api/product/add');
        console.log("Add response status:", response.status);
    } catch (error) {
        console.error("Add failed:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            // 404 means route not found. 
            // 400/401/500 means route exists but request was bad.
        }
    }
};

testAPI();
