import React from "react";
import BikeImage from "../assets/images/Bike.webp";
import AutoImage from "../assets/images/auto.webp";
import AutoShareImage from "../assets/images/autoshare.webp";  
import ParcelImage from "../assets/images/parcel.webp";
import CabEconomyImage from "../assets/images/taxi.webp";
import CabPremiumImage from "../assets/images/taxi premium.webp";
import BiketaxiImage from "../assets/images/image3.jpg";
import TaxiImage from "../assets/images/image6.webp";
import Parcel from "../assets/images/image7.jpg";
import Rider1 from '../assets/images/image2.webp';
import Rider2 from '../assets/images/image5.jpg';
import Rider3 from '../assets/images/image4.jpg'; 


export default function ServicePage() {
  const services = [
    { name: "Bike", icon: BikeImage },
    { name: "Auto", icon: AutoImage },
    { name: "Auto Share", icon: AutoShareImage },
    { name: "Courier", icon: ParcelImage },
    { name: "Cab Economy", icon: CabEconomyImage },
    { name: "Cab Premium", icon: CabPremiumImage },
  ];

  const features = [
    {
      title: "Get Quick Rides, Low Fares",
      description:
        "In Safari we ensure our customers get rides quickly at the most affordable prices.",
      button: "Book a ride",
      images: [Rider1, Rider2],
    },
    {
      title: "Flexible Hours & High Earnings",
      description:
        "Join as a Safari captain and earn on your own terms. Drive whenever you want.",
      button: "Start Earning",
      images: [BiketaxiImage, TaxiImage],
    },
    {
      title: "Safety for all",
      description:
        "At Safari, your safety is our priority. We're dedicated to making every ride safe and comfortable.",
      button: "Learn More",
      images: [Parcel,Rider3],
    },
  ]; 


  const ShapeDivider = ({ fill = "#ffffff", flip = false }) => (
    <div
      className={`w-full overflow-hidden leading-[0] ${
        flip ? "rotate-180" : ""
      }`}
    >
      <svg
        className="block w-[300%] h-[83px] relative"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
         d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
          fill={fill}
        ></path>
      </svg>
    </div>
  );

  return (

    
    <div className="bg-white">
   
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-5xl font-bold text-center mb-20"
           style={{
            textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`
      }}
          >Our Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
            {services.map((service, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={service.icon}
                  alt={service.name}
                  className="w-32 h-28 mb-2 object-cover rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-500"
                />
                <span className="text-sm md:text-base font-medium ">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
 
   
      <section className="mt-12 relative bg-[#FDF3E7]">
        <ShapeDivider fill=" #ffffff" />
        <div className="bg-[#FDF3E7] py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-40">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 grid grid-cols-2 gap-4">
                {feature.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="rounded-xl w-full h-40 object-cover shadow-md hover:shadow-2xl transform transition-transform duration-500 hover:scale-105"
                  />
                ))}
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-3xl font-bold mb-4"
                 style={{
                  textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`
            }}
                
                >{feature.title}</h3>
                <p className="mb-6 text-gray-900 text-base md:text-lg">{feature.description}</p>
                <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
                  {feature.button}
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
        <ShapeDivider fill=" #ffffff" flip />
      </section>
    </div>
  );
}
