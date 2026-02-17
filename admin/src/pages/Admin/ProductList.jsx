import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const ProductList = () => {

    const { products, getAllProducts, removeProduct, aToken } = useContext(AdminContext)
    const { currency } = useContext(AppContext)

    useEffect(() => {
        if (aToken) {
            getAllProducts()
        }
    }, [aToken])

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Products</h1>
            <div className='flex flex-wrap gap-4 pt-5 gap-y-6'>
                {
                    products.map((item, index) => (
                        <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                            <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
                            <div className='p-4'>
                                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                                <p className='text-zinc-600 text-sm'>{item.category}</p>
                                <div className='mt-2 flex items-center gap-1 text-sm'>
                                    <p>{currency}{item.price}</p>
                                </div>
                                <button onClick={() => removeProduct(item._id)} className='mt-2 bg-red-500 text-white px-4 py-2 rounded-full text-xs'>Remove</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList
