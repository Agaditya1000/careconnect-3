import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [pulse, setPulse] = useState(true);

  // Add pulsing animation effect for emergency banner
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Patient Dashboard</h1>

      {/* Emergency Assistance Banner */}
      <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transform transition-all ${pulse ? 'scale-105' : 'scale-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-bold text-lg">Emergency Assistance</h3>
              <p className="text-sm opacity-90">Immediate help when you need it most</p>
            </div>
          </div>
          <Link to="/contact" className="bg-white text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Help Now
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Link 
          to="/doctors" 
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-center transition-colors"
        >
          Book Appointment
        </Link>
        <Link 
          to="/book-ambulance" 
          className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg text-center transition-colors"
        >
          Book Ambulance
        </Link>
        <Link 
          to="/lab-tests" 
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center transition-colors"
        >
          Lab Tests
        </Link>
        <Link 
          to="/medical-supplies" 
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg text-center transition-colors"
        >
          Medical Essentials
        </Link>
        <div className="sm:col-span-2 lg:col-span-1">
          <Link 
            to="/medicine-reminder" 
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg text-center transition-colors block w-full h-full"
          >
            Medicine Reminders
          </Link>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <Link 
            to="/medical-records" 
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg text-center transition-colors block w-full h-full"
          >
            Medical Records
          </Link>
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-blue-50 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Health Tips</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Schedule regular health check-ups to monitor your conditions</li>
          <li>Keep your emergency contacts and ambulance numbers handy</li>
          <li>Set medicine reminders to ensure you never miss a dose</li>
          <li>Maintain a personal health record for better care coordination</li>
        </ul>
      </div>
    </div>
  );
};

export default PatientDashboard;