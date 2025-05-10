# CareConnect - Health Data Management System

CareConnect is a full-stack AI-driven healthcare management system designed to unify medical records, support emergency response, deliver medicines, and enable intelligent interaction between patients, doctors, and administrators.

## 🌐 Project Modules

- 🧑‍⚕️ **Admin & Doctor Panel (Frontend 1)**
  - Accessible only by Admins and registered Doctors
  - Features: Patient records management, appointments, real-time alerts, dashboard analytics

- 🧑‍💻 **Patient/User Portal (Frontend 2)**
  - Accessible by patients/public users
  - Features: AI chatbot, appointment booking, medicine ordering, ambulance requests

- 🖥️ **Backend API**
  - Centralized Node.js + Express backend
  - MongoDB for data storage, JWT for authentication

---

## 🚀 Features

### 🔐 Authentication
- Role-based login system (Admin, Doctor, Patient)
- JWT-secured endpoints

### 🩺 Health Management
- Medical history records
- Prescription handling
- Doctor-patient assignment

### 🤖 AI Chatbot
- Real-time query responses using Gemini or GPT
- Health tips and consultation guidance

### 🚑 Ambulance Booking
- Google Maps API for location-based booking
- Estimated arrival time and driver contact info

### 💊 Medicine Delivery
- Prescription-based medicine ordering
- Real-time tracking (optional)

### 🔔 Notifications
- Socket.IO-based real-time alerts
- Appointment, delivery, and emergency updates

---

## 🛠️ Tech Stack

| Layer       | Tech                                                  |
|-------------|--------------------------------------------------------|
| Frontend 1  | React.js, Tailwind CSS (Admin & Doctor Dashboard)     |
| Frontend 2  | React.js, Tailwind CSS (User/Patient Website)         |
| Backend     | Node.js, Express.js, MongoDB, JWT, Socket.IO          |
| APIs        | Google Maps API, Gemini/GPT API                       |
| Deployment  | AWS / Railway / Render / Vercel                       |

---

## 🗂️ Project Structure

careconnect/
├── admin-frontend/ # Admin & Doctor dashboard
│ └── src/
├── user-frontend/ # Patient/User website
│ └── src/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── utils/
└── README.md

yaml
Copy
Edit

---

## 📦 Installation Guide

### 1. Clone the repository
```bash
git clone https://github.com/your-username/careconnect.git
cd careconnect
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
3. Setup Admin Frontend
bash
Copy
Edit
cd ../admin-frontend
npm install
npm start
4. Setup User Frontend
bash
Copy
Edit
cd ../user-frontend
npm install
npm start
🔑 Environment Variables
Backend .env
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_api_key
GEMINI_API_KEY=your_gemini_api_key
Admin Frontend .env
ini
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_api_key
User Frontend .env
ini
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
🤝 Contributing
Fork the repo

Create a new branch: git checkout -b feature-name

Make your changes and commit: git commit -m 'Add feature'

Push and open a Pull Request

📜 License
Licensed under the MIT License. See LICENSE for more details.

👨‍💻 Authors
Aditya Kumar Gupta

Pratishtha Srivastava

Empowering digital healthcare with AI and automation — CareConnect 💙

yaml
Copy
Edit
