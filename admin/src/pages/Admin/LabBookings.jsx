import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const LabBookings = () => {

    const { aToken, labBookings, getAllLabBookings, cancelLabBooking, confirmLabBooking } = useContext(AdminContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (aToken) {
            getAllLabBookings()
        }
    }, [aToken])

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Lab Bookings</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Test Type</p>
                    <p>Date & Time</p>
                    <p>Contact</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>

                {labBookings.map((item, index) => (
                    <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0'>
                                <img className='w-5' src={assets.list_icon} alt="" />
                            </div>
                            <p>{item.name}</p>
                        </div>
                        <p className='max-sm:hidden'>{item.testType}</p>
                        <p>{new Date(item.date).toLocaleDateString()} at {item.time}</p>
                        <p>{item.phone}</p>
                        <div className='flex items-center gap-2'>
                            <p className={`text-xs inline border px-2 py-1 rounded-full ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                item.status === 'confirmed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
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
                                        onClick={() => confirmLabBooking(item._id)}
                                        className='w-8 cursor-pointer hover:scale-110 transition-all'
                                        src={assets.tick_icon}
                                        alt="Confirm"
                                        title="Confirm"
                                    />
                                    <img
                                        onClick={() => cancelLabBooking(item._id)}
                                        className='w-8 cursor-pointer hover:scale-110 transition-all'
                                        src={assets.cancel_icon}
                                        alt="Cancel"
                                        title="Cancel"
                                    />
                                </div>
                            )}
                            {item.status === 'confirmed' && (
                                <img
                                    onClick={() => cancelLabBooking(item._id)}
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

export default LabBookings
