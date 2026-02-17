import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const MedicalRecords = () => {
  const { userMedicalRecords, addMedicalRecord } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Lab Report');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('doctor', doctor);
    formData.append('date', date);
    formData.append('summary', summary);
    if (file) formData.append('file', file);

    const success = await addMedicalRecord(formData);
    if (success) {
      setShowForm(false);
      setTitle('');
      setDoctor('');
      setDate('');
      setSummary('');
      setFile(null);
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Medical Records</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className='bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition'
        >
          {showForm ? 'Close Form' : 'Add New Record'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100'>
          <h2 className='text-xl font-semibold mb-4'>Upload New Record</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className='w-full border rounded-md p-2' required placeholder="e.g. Blood Test Result" />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className='w-full border rounded-md p-2'>
                <option>Lab Report</option>
                <option>Prescription</option>
                <option>Imaging (X-Ray/MRI)</option>
                <option>Others</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Doctor</label>
              <input type="text" value={doctor} onChange={e => setDoctor(e.target.value)} className='w-full border rounded-md p-2' placeholder="Dr. Name" />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className='w-full border rounded-md p-2' required />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Summary</label>
              <textarea value={summary} onChange={e => setSummary(e.target.value)} className='w-full border rounded-md p-2' rows="3" placeholder="Brief summary of the report..."></textarea>
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Attachment (Image/PDF)</label>
              <input type="file" onChange={e => setFile(e.target.files[0])} className='w-full border rounded-md p-2' />
            </div>
          </div>
          <button type='submit' className='mt-4 bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700'>Save Record</button>
        </form>
      )}

      {/* Records List */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {userMedicalRecords.length === 0 ? (
          <p className='text-gray-500 col-span-full text-center py-10'>No medical records found. Add one to get started.</p>
        ) : (
          userMedicalRecords.map((record, index) => (
            <div key={index} className='bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition'>
              <div className='flex justify-between items-start mb-2'>
                <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium'>{record.type}</span>
                <span className='text-gray-400 text-xs'>{formatDate(record.date)}</span>
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-1'>{record.title}</h3>
              <p className='text-sm text-gray-600 mb-3'>By: {record.doctor || 'Unknown'}</p>
              <p className='text-gray-700 text-sm mb-4 line-clamp-3'>{record.summary}</p>
              {record.fileUrl && (
                <a href={record.fileUrl} target='_blank' rel="noreferrer" className='block text-center w-full border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white transition'>
                  View Document
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;