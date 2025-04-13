import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>
      {/* Stats Cards Row */}
      <div className='flex flex-wrap gap-3'>
        {/* Doctors Card */}
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

        {/* Ambulance Bookings Card */}
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.ambulance_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.ambulanceBookings || 0}</p>
            <p className='text-gray-400'>Ambulance Bookings</p>
          </div>
        </div>

        {/* Lab Bookings Card - NEW */}
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.lab_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.labBookings || 0}</p>
            <p className='text-gray-400'>Lab Bookings</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className='bg-white mt-6'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Appointments</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <img 
                  onClick={() => cancelAppointment(item._id)} 
                  className='w-10 cursor-pointer' 
                  src={assets.cancel_icon} 
                  alt="" 
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Latest Ambulance Bookings Section */}
      <div className='bg-white mt-6'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <img src={assets.ambulance_icon} alt="" />
          <p className='font-semibold'>Latest Ambulance Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAmbulanceBookings?.slice(0, 5).map((booking, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center'>
                <img className='w-6' src={assets.ambulance_icon} alt="Ambulance" />
              </div>
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>
                  {booking.emergencyType} Emergency
                </p>
                <p className='text-gray-600'>
                  {booking.location.address}
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                booking.status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Lab Bookings Section - NEW */}
      <div className='bg-white mt-6'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <img src={assets.lab_icon} alt="" />
          <p className='font-semibold'>Latest Lab Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestLabBookings?.slice(0, 5).map((booking, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <div className='w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center'>
                <img className='w-6' src={assets.lab_icon} alt="Lab Test" />
              </div>
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>
                  {booking.testType}
                </p>
                <p className='text-gray-600'>
                  {booking.name} - {booking.phone}
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard