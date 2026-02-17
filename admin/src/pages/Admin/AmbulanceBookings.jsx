import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AmbulanceBookings = () => {

    const { aToken, ambulanceBookings, getAllAmbulanceBookings, cancelAmbulanceBooking, approveAmbulanceBooking } = useContext(AdminContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (aToken) {
            getAllAmbulanceBookings()
        }
    }, [aToken])

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Ambulance Bookings</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Type</p>
                    <p>Location</p>
                    <p>Date & Time</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>

                {ambulanceBookings.map((item, index) => (
                    <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0'>
                                <img className='w-5' src={assets.ambulance_icon} alt="" />
                            </div>
                            <p>{item.patientName}</p>
                        </div>
                        <p className='max-sm:hidden'>{item.emergencyType}</p>
                        <p>{item.location?.address?.substring(0, 30)}...</p>
                        <p>{new Date(item.createdAt).toLocaleString()}</p>
                        <div className='flex items-center gap-2'>
                            <p className={`text-xs inline border px-2 py-1 rounded-full ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                item.status === 'dispatched' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                    item.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                                        'bg-red-100 text-red-800 border-red-200'
                                }`}>
                                {item.status}
                            </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            {item.status === 'pending' && (
                                <div className='flex gap-2'>
                                    <img
                                        onClick={() => approveAmbulanceBooking(item._id)}
                                        className='w-8 cursor-pointer hover:scale-110 transition-all'
                                        src={assets.tick_icon}
                                        alt="Approve"
                                        title="Approve"
                                    />
                                    <img
                                        onClick={() => cancelAmbulanceBooking(item._id)}
                                        className='w-8 cursor-pointer hover:scale-110 transition-all'
                                        src={assets.cancel_icon}
                                        alt="Cancel"
                                        title="Deny"
                                    />
                                </div>
                            )}
                            {item.status === 'dispatched' && (
                                <img
                                    onClick={() => cancelAmbulanceBooking(item._id)}
                                    className='w-8 cursor-pointer hover:scale-110 transition-all'
                                    src={assets.cancel_icon}
                                    alt="Cancel"
                                    title="Cancel"
                                />
                            )}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default AmbulanceBookings
