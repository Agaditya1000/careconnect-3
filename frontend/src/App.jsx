import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyDashboard from './pages/MyDashboard'
import Chatbot from './pages/Chatbot'; // ✅ Import Chatbot
import MyProfile from './pages/MyProfile'
import BookAnAmbulance from './pages/BookAmbulance'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import LabBooking from './pages/LabBooking'
import BuyMedicalEssentials from './pages/BuyMedicalEssential'
import MedicineReminder from './pages/MedicineReminder'
import MedicalRecords from './pages/MedicalRecord'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/my-dashboard' element={<MyDashboard />} />
        <Route path='/book-ambulance' element={<BookAnAmbulance />} />
        <Route path='/lab-tests' element={<LabBooking />} />
        <Route path='/medical-supplies' element={<BuyMedicalEssentials />} />
        <Route path='/medicine-reminder' element={<MedicineReminder />} />
        <Route path='/medical-records' element={<MedicalRecords />} />
      </Routes>
      <Chatbot /> {/* ✅ Add Chatbot component here */}
      <Footer />
    </div>
  )
}

export default App