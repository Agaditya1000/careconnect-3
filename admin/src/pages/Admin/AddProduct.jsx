import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddProduct = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Essentials')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            console.log('Submitting Product Add Request');
            console.log('Backend URL:', backendUrl);
            console.log('Target URL:', backendUrl + '/api/product/add');
            console.log('Token:', aToken);

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)

            const { data } = await axios.post(backendUrl + '/api/product/add', formData, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPrice('')
                setDescription('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <p className='mb-3 text-lg font-medium'>Add Product</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>Upload product <br /> picture</p>
                </div>

                <div className='flex flex-col gap-4 text-gray-600'>
                    <div className='flex flex-col gap-1'>
                        <p>Product Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Product Description</p>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='border rounded px-3 py-2' type="text" placeholder='Description' rows={5} required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Product Price</p>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} className='border rounded px-3 py-2' type="number" placeholder='Price' required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Category</p>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} className='border rounded px-3 py-2'>
                            <option value="Essentials">Essentials</option>
                            <option value="Medicines">Medicines</option>
                            <option value="Supplements">Supplements</option>
                            <option value="Devices">Devices</option>
                        </select>
                    </div>
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Product</button>

            </div>


        </form>
    )
}

export default AddProduct
