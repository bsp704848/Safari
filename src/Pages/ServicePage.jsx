import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Carousel from "../Components/UI/Carousel";


export default function ServicePage() {

  const [data, setData] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/service`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch service page data", err));
  }, []);

  if (!data) {
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

  const renderServiceItem = (service) => (
  <div className="flex items-center gap-4 bg-white text-black p-4 rounded-xl shadow-md hover:shadow-2xl transition duration-300 h-auto w-auto">
    <img
      src={service.icon}
      alt={service.name}
      className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
    />
    <div className="flex flex-col justify-center">
      <span className="text-base font-semibold mb-1">{service.name}</span>
      <p className="text-xs text-gray-700">{service.description}</p>
    </div>
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
          <Carousel
            items={data.services || []}
            slidesPerView={2}
            renderItem={renderServiceItem}
            showButtons={true}
            autoplay={false}
          />
        </div>
      </section>


      <section className="mt-12 relative bg-[#FBF3B9]">
        <ShapeDivider fill=" #ffffff" />
        <div className="bg-[#FBF3B9] py-12">
          <div className="max-w-6xl mx-auto px-4 space-y-40">
            {data?.features.map((feature, idx) => (
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
