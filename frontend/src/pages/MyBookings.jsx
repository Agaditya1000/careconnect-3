import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const MyBookings = () => {

    const {
        userLabBookings,
        userAmbulanceBookings,
        userOrders,
        userMedicines,
        userMedicalRecords,
        currencySymbol
    } = useContext(AppContext)

    const [activeTab, setActiveTab] = useState('lab')

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <div className='p-4'>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Bookings & Records</p>

            <div className='flex flex-wrap gap-4 mt-4 mb-6 border-b pb-2'>
                <button onClick={() => setActiveTab('lab')} className={`py-2 px-4 rounded ${activeTab === 'lab' ? 'bg-primary text-white' : 'bg-gray-100'}`}>Lab Tests</button>
                <button onClick={() => setActiveTab('ambulance')} className={`py-2 px-4 rounded ${activeTab === 'ambulance' ? 'bg-primary text-white' : 'bg-gray-100'}`}>Ambulance</button>
                <button onClick={() => setActiveTab('orders')} className={`py-2 px-4 rounded ${activeTab === 'orders' ? 'bg-primary text-white' : 'bg-gray-100'}`}>Product Orders</button>
                <button onClick={() => setActiveTab('medicine')} className={`py-2 px-4 rounded ${activeTab === 'medicine' ? 'bg-primary text-white' : 'bg-gray-100'}`}>Medicines</button>
                <button onClick={() => setActiveTab('records')} className={`py-2 px-4 rounded ${activeTab === 'records' ? 'bg-primary text-white' : 'bg-gray-100'}`}>Medical Records</button>
            </div>

            {/* Lab Bookings Tab */}
            {activeTab === 'lab' && (
                <div className='grid grid-cols-1 gap-4'>
                    {userLabBookings.length === 0 ? <p>No Lab Bookings found.</p> : userLabBookings.map((item, index) => (
                        <div key={index} className='border rounded p-4 shadow-sm bg-white'>
                            <p className='font-bold text-lg'>{item.testType}</p>
                            <p>Date: {formatDate(item.date)} at {item.time}</p>
                            <p>Status: <span className='font-medium'>{item.status}</span></p>
                        </div>
                    ))}
                </div>
            )}

            {/* Ambulance Bookings Tab */}
            {activeTab === 'ambulance' && (
                <div className='grid grid-cols-1 gap-4'>
                    {userAmbulanceBookings.length === 0 ? <p>No Ambulance Bookings found.</p> : userAmbulanceBookings.map((item, index) => (
                        <div key={index} className='border rounded p-4 shadow-sm bg-white'>
                            <p className='font-bold text-lg'>{item.emergencyType.toUpperCase()} Emergency</p>
                            <p>Location: {item.location}</p>
                            <p>Date: {formatDate(item.createdAt)}</p>
                            <p>Status: <span className='font-medium'>{item.status}</span></p>
                        </div>
                    ))}
                </div>
            )}

            {/* Product Orders Tab */}
            {activeTab === 'orders' && (
                <div className='grid grid-cols-1 gap-4'>
                    {userOrders.length === 0 ? <p>No Orders found.</p> : userOrders.map((item, index) => (
                        <div key={index} className='border rounded p-4 shadow-sm bg-white'>
                            <div className='flex gap-4'>
                                <img className='w-20 h-20 object-cover' src={item.items[0]?.image} alt="" />
                                <div>
                                    <p className='font-bold'>{item.items.map(i => i.name).join(', ')}</p>
                                    <p>{currencySymbol}{item.amount}</p>
                                    <p>Method: {item.paymentMethod}</p>
                                    <p>Status: <span className='font-medium'>{item.status}</span></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Medicines Tab */}
            {activeTab === 'medicine' && (
                <div className='grid grid-cols-1 gap-4'>
                    {userMedicines.length === 0 ? <p>No Medicine Reminders found.</p> : userMedicines.map((item, index) => (
                        <div key={index} className='border rounded p-4 shadow-sm bg-white'>
                            <p className='font-bold text-lg'>{item.name}</p>
                            <p>Dosage: {item.dosage}</p>
                            <p>Time: {item.time} ({item.frequency})</p>
                            <p>Active: {item.isActive ? 'Yes' : 'No'}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Medical Records Tab */}
            {activeTab === 'records' && (
                <div className='grid grid-cols-1 gap-4'>
                    {userMedicalRecords.length === 0 ? <p>No Medical Records found.</p> : userMedicalRecords.map((item, index) => (
                        <div key={index} className='border rounded p-4 shadow-sm bg-white'>
                            <p className='font-bold text-lg'>{item.title} ({item.type})</p>
                            <p>Doctor: {item.doctor}</p>
                            <p>Date: {formatDate(item.date)}</p>
                            {item.fileUrl && <a href={item.fileUrl} target='_blank' rel='noreferrer' className='text-blue-500 underline text-sm'>View Document</a>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyBookings
