import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function ServicePage() {

  const [pageData, setPageData] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/service`)
      .then((res) => setPageData(res.data))
      .catch((err) => console.error("Failed to fetch service page data", err));
  }, []); 

  if (!pageData) {
  return <div className="text-center p-10">Loading...</div>;
}

  const ShapeDivider = ({ fill = "#ffffff", flip = false }) => (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""
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
            {pageData?.services.map((service, idx) => (
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


      <section className="mt-12 relative bg-[#FBF3B9]">
        <ShapeDivider fill=" #ffffff" />
        <div className="bg-[#FBF3B9] py-12">
          <div className="max-w-6xl mx-auto px-4 space-y-40">
            {pageData?.features.map((feature, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""
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
                    }}>
                    {feature.title}
                  </h3>
                  <p className="mb-6 text-gray-900 text-base md:text-lg">
                    {feature.description}
                  </p>
                  <button
                    className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
                    onClick={() => navigate("/book-ride")}
                  >
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
