import React from 'react';
import 'tailwindcss/tailwind.css'; 
import Img from "../assests/close-up-man-old-motorcycle.jpg"
import Navbar from './Navbar';


const AboutUs = () => {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
<div className="bg-white flex items-center justify-center min-h-screen">
            <div className="text-center p-6">
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <div className="flex justify-center mb-6">
                    <img 
                        src={Img} 
                        alt="A man repairing a motorcycle in a garage" 
                        className=" w-96 rounded-lg h-58" 
                    />
                </div>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                    Two wheeler should be maintained properly and repaired within due course of time to avoid unexpected breakdown of engine, battery or parts. We, at Raven Repair Services therefore, provide repair and maintenance services of the two-wheeler so that it works well and provides great service. We are located at Tamil Nadu Coimbatore-North Saravanmappti  . You can rely on us for rendering repair services of two wheeler of any type - bikes and scooters. Contact us today!
                </p>
            </div>
        </div>
        </div>
        
    );
};

export default AboutUs