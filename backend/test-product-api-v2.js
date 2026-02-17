import axios from 'axios';

const testAPI = async () => {
    try {
        console.log("--- Testing List ---");
        const resList = await axios.get('http://localhost:4000/api/product/list');
        console.log("List Status:", resList.status);
        console.log("List Items:", resList.data.products?.length);
    } catch (error) {
        console.error("List Error:", error.message);
    }

    try {
        console.log("\n--- Testing Add (No Token) ---");
        const resAdd = await axios.post('http://localhost:4000/api/product/add', {});
        console.log("Add Status:", resAdd.status);
        console.log("Add Data:", resAdd.data);
    } catch (error) {
        if (error.response) {
            console.log("Add Error Status:", error.response.status);
            console.log("Add Error Data:", error.response.data);
        } else {
            console.error("Add Request Failed:", error.message);
        }
    }
};

testAPI();
