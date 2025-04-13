import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Edit } from 'lucide-react';

const LabBooking = () => {
  const [bookingStatus, setBookingStatus] = useState({ status: '', message: '' });
  const [bookingData, setBookingData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm();

  const testTypes = [
    'Blood Test',
    'Urine Test',
    'X-Ray',
    'MRI Scan',
    'CT Scan',
    'Ultrasound',
    'ECG',
    'Thyroid Test',
  ];

  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Fetch available time slots when date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedDate) {
        try {
          const response = await fetch(`http://localhost:4000/api/lab-bookings/available-slots?date=${selectedDate}`);
          const data = await response.json();
          if (response.ok) {
            setAvailableSlots(data.data);
          }
        } catch (error) {
          console.error('Error fetching available slots:', error);
        }
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);

  const onSubmit = async (data) => {
    try {
      const endpoint = isEditing && bookingData?._id 
        ? `http://localhost:4000/api/lab-bookings/${bookingData._id}`
        : 'http://localhost:4000/api/lab-bookings';

      const method = isEditing && bookingData?._id ? 'PATCH' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          date: new Date(data.date).toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process booking');
      }

      const result = await response.json();

      setBookingData(result.data);
      setBookingStatus({
        status: 'success',
        message: `Your ${data.testType} on ${data.date} at ${data.time} has been ${isEditing ? 'updated' : 'booked'} successfully!`,
      });

      toast.success(`Lab booking ${isEditing ? 'updated' : 'created'}!`);
      setIsEditing(false);
    } catch (error) {
      console.error('Booking error:', error);
      setBookingStatus({
        status: 'error',
        message: error.message || 'Failed to process booking. Please try again later.',
      });
      toast.error(error.message || 'Failed to process booking');
    }
  };

  const handleEdit = () => {
    if (bookingData) {
      // Pre-fill the form with existing booking data
      setValue('name', bookingData.name);
      setValue('phone', bookingData.phone);
      setValue('email', bookingData.email);
      setValue('testType', bookingData.testType);
      setValue('date', bookingData.date.split('T')[0]);
      setValue('time', bookingData.time);
      setValue('notes', bookingData.notes);
      setSelectedDate(bookingData.date.split('T')[0]);
      setIsEditing(true);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setValue('date', e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">Book a Lab Test</h1>
            <p className="mt-2 text-blue-100 text-center">
              Schedule your lab tests with ease
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\+?[\d\s-]+$/,
                        message: 'Invalid phone number',
                      },
                    })}
                    className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Test Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Test Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register('testType', { required: 'Test type is required' })}
                  className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Test Type</option>
                  {testTypes.map((test) => (
                    <option key={test} value={test}>
                      {test}
                    </option>
                  ))}
                </select>
              </div>
              {errors.testType && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.testType.message}</p>
              )}
            </div>

            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    {...register('date', { 
                      required: 'Date is required',
                      onChange: handleDateChange
                    })}
                    min={minDate}
                    className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preferred Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    {...register('time', { required: 'Time is required' })}
                    className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    disabled={!selectedDate}
                  >
                    <option value="">Select Time</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Additional Notes
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Any specific concerns or requirements..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  px-6 py-3 bg-blue-600 text-white rounded-md font-medium
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-blue-500 transition-colors
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting 
                  ? 'Processing...' 
                  : isEditing 
                    ? 'Update Booking' 
                    : 'Book Lab Test'}
              </button>
            </div>
          </form>

          {/* Booking Status Section */}
          {bookingStatus.status && (
            <div className="mt-6 p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Booking Status</h3>
                {!isEditing && bookingData && (
                  <button
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Booking
                  </button>
                )}
              </div>
              <div
                className={`p-4 rounded-lg ${
                  bookingStatus.status === 'success'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
                }`}
              >
                <p>{bookingStatus.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabBooking;