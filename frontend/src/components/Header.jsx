import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Book Appointment With Trusted Doctors",
      description: "Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.",
      buttonText: "Book appointment",
      image: assets.header_img,
      profiles: assets.group_profiles,
      bgColor: "bg-primary"
    },
    {
      title: "Emergency Ambulance Service",
      description: "Get immediate ambulance assistance with just one click. Fast response, 24/7 availability.",
      buttonText: "Call ambulance",
      image: assets.ambulance_img, // You'll need to add this to your assets
      profiles: assets.emergency_team, // You'll need to add this to your assets
      bgColor: "bg-red-600"
    },
    {
      title: "10 Minute Medical Essentials Delivery",
      description: "Essential medicines delivered to your doorstep within 10 minutes. Never run out of medications again.",
      buttonText: "Order now",
      image: assets.delivery_img, // You'll need to add this to your assets
      profiles: assets.delivery_team, // You'll need to add this to your assets
      bgColor: "bg-blue-600"
    },
    {
      title: "Lab Test Booking",
      description: "Book diagnostic tests with certified labs. Home collection available for your convenience.",
      buttonText: "Book test",
      image: assets.lab_img, // You'll need to add this to your assets
      profiles: assets.lab_team, // You'll need to add this to your assets
      bgColor: "bg-purple-600"
    },
    {
      title: "CareConnect - Your Health Companion",
      description: "Personalized health tracking and doctor connections for continuous care management.",
      buttonText: "About",
      image: assets.careconnect_img, // You'll need to add this to your assets
      profiles: assets.care_team, // You'll need to add this to your assets
      bgColor: "bg-green-600"
    }
  ];

  // Auto slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden">
      {/* Slides */}
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className={`flex-shrink-0 w-full flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 ${slide.bgColor}`}>
            {/* Slide Left */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
              <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                {slide.title}
              </p>
              <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-28' src={slide.profiles} alt="" />
                <p>{slide.description}</p>
              </div>
              <a href='about' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                {slide.buttonText} <img className='w-3' src={assets.arrow_icon} alt="" />
              </a>
            </div>

            {/* Slide Right */}
            <div className='md:w-1/2 relative'>
              <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={slide.image} alt="" />
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full text-white hover:bg-opacity-50"
      >
        &lt;
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full text-white hover:bg-opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}

export default Header;