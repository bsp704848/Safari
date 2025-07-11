import React, { useEffect, useState,useRef,forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ServicePage from "../Pages/ServicePage";



const HomePage = forwardRef((props, ref) => {
    const serviceRef = useRef(null);
  const location = useLocation();
  const [sectionData, setSectionData] = useState(null); 

    useImperativeHandle(ref, () => ({
    scrollToService: () => {
      if (serviceRef.current) {
        serviceRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }));

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/home`) 
    .then(res => {
      
      setSectionData(res.data)})
      .catch(err => console.error("Failed to load home section", err));
  }, []);
  
    
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("section") === "service" && serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location, sectionData]);

  
  if (!sectionData) return <div className="text-center p-10">Loading...</div>;

  
  const ShapeDivider = ({ fill = "#ffffff", flip = false }) => (
    <div
      className={`w-full overflow-hidden leading-[0] ${
        flip ? "rotate-180" : ""
      }`}
    >
      <svg
        className="block w-[300%] h-[25px] relative"
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
    <>
      <div className="font-sans">
        <section className="relative bg-[#FBF3B9] ">
          <ShapeDivider fill="#ffffff" />
          <div className="py-16 px-4 text-center bg-[#FBF3B9] ">
            <div className="max-w-7xl mx-auto">
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 text-center text-black"
                style={{
                  textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`,
                }}
              >
                 {sectionData.sectionTitle}
              </h2>
              <p className="text-gray-900 max-w-2xl mx-auto mb-12 text-center">
                {sectionData.subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {sectionData.cards.map((card, idx) => (
              <div key={idx} className="max-w-[300px] mx-auto">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 rounded-2xl object-cover hover:scale-105 transition-transform"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </div>
              </div>
            ))}
              </div>
            </div>
          </div>
          <ShapeDivider fill="#ffffff" flip />
        </section>
      </div>
      <div ref={serviceRef}>
        <ServicePage />
      </div>
    </>
  );
});

export default HomePage;