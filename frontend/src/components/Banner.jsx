import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
    const [currentBanner, setCurrentBanner] = useState(0)

    // Banner data array
    const banners = [
        {
            title1: "Book Appointment",
            title2: "With 100+ Trusted Doctors",
            buttonText: "Create account",
            action: () => { navigate('/login'); scrollTo(0, 0) },
            image: assets.appointment_img
        },
        {
            title1: "24/7 Emergency",
            title2: "Contact our emergency line",
            buttonText: "Call now",
            action: () => { window.location.href = 'tel:+1234567890' },
            image: assets.emergency_img // You'll need to add this to your assets
        },
        {
            title1: "Specialist Doctors",
            title2: "Find the right specialist for you",
            buttonText: "Browse specialists",
            action: () => { navigate('/doctors'); scrollTo(0, 0) },
            image: assets.specialists_img // You'll need to add this to your assets
        },
        {
            title1: "Health Checkups",
            title2: "Comprehensive health packages",
            buttonText: "View packages",
            action: () => { navigate('/services'); scrollTo(0, 0) },
            image: assets.checkup_img // You'll need to add this to your assets
        },
        {
            title1: "Online Consultation",
            title2: "Consult from the comfort of home",
            buttonText: "Start consultation",
            action: () => { navigate('/telemedicine'); scrollTo(0, 0) },
            image: assets.online_consult_img // You'll need to add this to your assets
        }
    ]

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [banners.length])

    return (
        <div className='relative overflow-hidden bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 h-[300px] sm:h-[350px] md:h-[400px]'>
            {/* Banners container with sliding animation */}
            <div 
                className='flex transition-transform duration-500 ease-in-out'
                style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
                {banners.map((banner, index) => (
                    <div key={index} className='flex-shrink-0 w-full'>
                        <div className='flex h-full w-full'>
                            {/* Left Side */}
                            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                                    <p>{banner.title1}</p>
                                    <p className='mt-4'>{banner.title2}</p>
                                </div>
                                <button 
                                    onClick={banner.action} 
                                    className='bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'
                                >
                                    {banner.buttonText}
                                </button>
                            </div>

                            {/* Right Side */}
                            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                                <img 
                                    className='w-full absolute bottom-0 right-0 max-w-md' 
                                    src={banner.image} 
                                    alt={banner.title1} 
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation dots */}
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentBanner(index)}
                        className={`w-3 h-3 rounded-full ${currentBanner === index ? 'bg-white' : 'bg-gray-300'}`}
                        aria-label={`Go to banner ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation arrows */}
            <button 
                onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50'
                aria-label='Previous banner'
            >
                &lt;
            </button>
            <button 
                onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50'
                aria-label='Next banner'
            >
                &gt;
            </button>
        </div>
    )
}

export default Banner