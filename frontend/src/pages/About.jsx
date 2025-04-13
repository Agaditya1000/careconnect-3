import React from 'react';
import { assets } from '../assets/assets';
import drnitinimage from "../images/dr.1.png";
import drravimage from "../images/dr.2.png";
import drtrimage from "../images/dr.3.png";

const About = () => {
  // Leadership Data
  const leaders = [
    {
      name: "Dr. T. R. PAARIVENDHAR",
      role: "Chancellor",
      image: drtrimage,
      description: "Thiru. Dr. T.R. Paarivendhar is the founder Chancellor of the SRM Group of Institutions..."
    },
    {
      name: "DR.NITIN M NAGARKAR",
      role: "Pro Vice-Chancellor (MHS) In-charge",
      image: drnitinimage,
      description: "MBBS – Patna Medical College – Patna University –1987..."
    },
    {
      name: "Professor Lt Col A.RAVIKUMAR",
      role: "Advisor, Medical & Health Sciences",
      image: drravimage,
      description: "Cochlear implantation (Director of Cochlear Implant program..."
    }
  ];

  // Why Choose Us Features
  const features = [
    {
      icon: "🛡️",
      title: "Advanced Security",
      description: "Your health data is protected with enterprise-grade security measures"
    },
    {
      icon: "⏰",
      title: "24/7 Availability",
      description: "Access care whenever you need it, day or night"
    },
    {
      icon: "👨‍⚕️",
      title: "Expert Doctors",
      description: "Board-certified physicians with extensive experience"
    },
    {
      icon: "👥",
      title: "Patient Community",
      description: "Connect with others managing similar health conditions"
    },
    {
      icon: "🏆",
      title: "Award-Winning",
      description: "Recognized for excellence in healthcare innovation"
    },
    {
      icon: "🏥",
      title: "Comprehensive Care",
      description: "All your healthcare needs in one convenient platform"
    }
  ];

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to CareConnect, your trusted partner in managing your healthcare needs conveniently and efficiently. At CareConnect, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>CareConnect is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, CareConnect is here to support you every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at CareConnect is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className='my-16'>
        <div className='text-center text-2xl mb-10 text-[#707070]'>
          <p>OUR <span className='text-gray-700 font-semibold'>LEADERSHIP</span></p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {leaders.map((leader) => (
            <div key={leader.name} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
              <img src={leader.image} alt={leader.name} className='w-full h-60 object-cover' />
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>{leader.name}</h3>
                <p className='text-primary mb-3 text-sm'>{leader.role}</p>
                <p className='text-gray-600 text-sm'>{leader.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose CareConnect Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='text-center text-2xl mb-12 text-[#707070]'>
            <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE CARECONNECT</span></p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 mr-4 rounded-full bg-blue-100 text-blue-600 text-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600 pl-16">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;