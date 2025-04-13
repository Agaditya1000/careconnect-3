import React, { useState } from 'react';
import { FaAmbulance, FaMapMarkerAlt, FaPhone, FaClock, FaUser, FaNotesMedical, FaShieldAlt, FaFirstAid, FaHospital } from 'react-icons/fa';
import axios from 'axios';

const BookAnAmbulance = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    emergencyType: 'general',
    notes: '',
    bookingType: 'now',
    scheduleTime: ''
  });

  const [currentStep, setCurrentStep] = useState('form');
  const [isLoading, setIsLoading] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      bookingType: type,
      scheduleTime: type === 'now' ? '' : prev.scheduleTime
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare data for API
      const bookingData = {
        patientName: formData.name,
        contactNumber: formData.phone,
        location: formData.location,
        emergencyType: formData.emergencyType,
        additionalNotes: formData.notes,
        bookingType: formData.bookingType,
        scheduledTime: formData.bookingType === 'later' ? formData.scheduleTime : null
      };

      // Make API call
      const response = await axios.post('http://localhost:4000/api/ambulance', bookingData);
      
      if (response.status === 201) {
        setCurrentStep('confirmation');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book ambulance. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
    setFormData({
      name: '',
      phone: '',
      location: '',
      emergencyType: 'general',
      notes: '',
      bookingType: 'now',
      scheduleTime: ''
    });
  };

  const emergencyTypes = [
    { value: 'general', label: 'General Emergency' },
    { value: 'accident', label: 'Accident' },
    { value: 'heart', label: 'Heart Attack/Stroke' },
    { value: 'pregnancy', label: 'Pregnancy Related' },
    { value: 'burn', label: 'Severe Burns' },
    { value: 'other', label: 'Other Medical Emergency' }
  ];

  if (currentStep === 'confirmation') {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <FaAmbulance className="mx-auto" size={48} color="#2a9d8f" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Ambulance Booked Successfully!</h2>
          <p className="mb-2">Your ambulance is on the way to:</p>
          <p className="flex items-center justify-center gap-2 text-xl text-[#2a9d8f] my-4">
            <FaMapMarkerAlt /> {formData.location}
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg my-6 text-left">
            <p className="mb-2"><strong>Patient Name:</strong> {formData.name}</p>
            <p className="mb-2"><strong>Emergency Type:</strong> {
              emergencyTypes.find(type => type.value === formData.emergencyType)?.label
            }</p>
            <p className="mb-2"><strong>Estimated Arrival:</strong> 8-12 minutes</p>
            <p><strong>Contact Number:</strong> {formData.phone}</p>
          </div>
          
          <button 
            onClick={handleBackToForm}
            className="w-full py-4 bg-[#264653] text-white rounded-lg font-medium my-4 hover:bg-[#1d3a4a] transition-colors"
          >
            Book Another Ambulance
          </button>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="mb-2">For immediate assistance, call our emergency line:</p>
            <a 
              href="tel:+11234567890" 
              className="inline-flex items-center gap-2 text-[#e76f51] font-semibold hover:text-[#d45a3d] transition-colors"
            >
              <FaPhone /> +1 (123) 456-7890
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center text-white p-16 rounded-lg mb-8 text-center" 
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-4">
          <FaAmbulance /> Emergency Ambulance Services
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-4">
          24/7 emergency medical transportation with trained paramedics and advanced life support equipment
        </p>
      </section>
      
      {/* Service Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:-translate-y-1">
          <FaShieldAlt className="mx-auto text-3xl text-[#2a9d8f] mb-4" />
          <h3 className="text-xl font-semibold text-[#264653] mb-2">Advanced Life Support</h3>
          <p className="text-gray-700">
            Our ambulances are equipped with advanced medical equipment and staffed by trained paramedics.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:-translate-y-1">
          <FaFirstAid className="mx-auto text-3xl text-[#2a9d8f] mb-4" />
          <h3 className="text-xl font-semibold text-[#264653] mb-2">Rapid Response</h3>
          <p className="text-gray-700">
            Average response time under 10 minutes in urban areas.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:-translate-y-1">
          <FaHospital className="mx-auto text-3xl text-[#2a9d8f] mb-4" />
          <h3 className="text-xl font-semibold text-[#264653] mb-2">Hospital Coordination</h3>
          <p className="text-gray-700">
            Seamless transfer and immediate care upon arrival.
          </p>
        </div>
      </div>
      
      {/* Booking Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#264653] flex items-center justify-center gap-2 mb-2">
          <FaAmbulance /> Book an Ambulance
        </h2>
        <p className="text-xl text-gray-700">
          Fast, reliable emergency medical transportation
        </p>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}
      
      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        {/* Patient Information */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-[#264653] flex items-center gap-2 mb-4">
            <FaUser /> Patient Information
          </h3>
          <div className="mb-6">
            <label htmlFor="name" className="block font-medium text-[#264653] mb-2">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/50"
              placeholder="Patient's full name"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="phone" className="block font-medium text-[#264653] mb-2">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/50"
              placeholder="Contact number"
            />
          </div>
        </div>
        
        {/* Pickup Location */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-[#264653] flex items-center gap-2 mb-4">
            <FaMapMarkerAlt /> Pickup Location
          </h3>
          <div className="mb-6">
            <label htmlFor="location" className="block font-medium text-[#264653] mb-2">Address or Landmark *</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/50"
                placeholder="Exact location"
              />
              <button 
                type="button" 
                onClick={() => setMapVisible(!mapVisible)}
                className="bg-gray-200 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {mapVisible ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
          </div>
          
          {mapVisible && (
            <div className="h-72 bg-gray-200 rounded-lg flex items-center justify-center my-4">
              <p>Map integration would appear here</p>
            </div>
          )}
        </div>
        
        {/* Emergency Details */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-[#264653] flex items-center gap-2 mb-4">
            <FaNotesMedical /> Emergency Details
          </h3>
          <div className="mb-6">
            <label htmlFor="emergencyType" className="block font-medium text-[#264653] mb-2">Type of Emergency *</label>
            <select
              id="emergencyType"
              name="emergencyType"
              value={formData.emergencyType}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/50"
            >
              {emergencyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="notes" className="block font-medium text-[#264653] mb-2">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Specific instructions about the emergency"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/50"
            />
          </div>
        </div>
        
        {/* Booking Time */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#264653] flex items-center gap-2 mb-4">
            <FaClock /> Booking Time
          </h3>
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleBookingTypeChange('now')}
              className={`flex-1 py-4 rounded-lg font-medium ${formData.bookingType === 'now' ? 'bg-[#2a9d8f] text-white' : 'bg-gray-200'}`}
            >
              Book Now (Immediate Dispatch)
            </button>
            <button
              type="button"
              onClick={() => handleBookingTypeChange('later')}
              className={`flex-1 py-4 rounded-lg font-medium ${formData.bookingType === 'later' ? 'bg-[#2a9d8f] text-white' : 'bg-gray-200'}`}
            >
              Schedule for Later
            </button>
          </div>
          
          {formData.bookingType === 'later' && (
            <div className="mb-6">
              <label htmlFor="scheduleTime" className="block font-medium text-[#264653] mb-2">Scheduled Time *</label>
              <input
                type="datetime-local"
                id="scheduleTime"
                name="scheduleTime"
                value={formData.scheduleTime}
                onChange={handleInputChange}
                required={formData.bookingType === 'later'}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#2a9d8f] focus:ring-2 focus:ring-[#2a9d8f]/50"
              />
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[#2a9d8f] text-white rounded-lg text-lg font-semibold hover:bg-[#21867a] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Confirm Booking'}
        </button>
        
        <div className="mt-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
          <p className="text-red-600 text-sm">
            <strong>For life-threatening emergencies, please call 911 immediately.</strong> This service is for urgent but non-life-threatening medical transportation needs.
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookAnAmbulance;