import React, { useState, useEffect } from "react";
import axios from "axios";


export default function AboutPage() {

  const [data, setData] = useState(null);
  

    useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/about`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error loading About page", err));
  }, []);

  if (!data) return <div className="p-10 text-center">Loading...</div>;



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
    <div className="bg-[#FBF3B9] text-gray-900">
      <ShapeDivider fill="#ffffff" />
      <div className=" text-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              textShadow:
                "0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green",
            }}
          >
          {data.pageTitle}
          </h1>
          <p className="text-lg md:text-xl mb-4">
           {data.subtitle}
          </p>
          <p className="text-md md:text-lg max-w-3xl mx-auto">
           {data.description}
          </p>
        </div>
      </div>

      <div className="bg-[#FBF3B9] text-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2
            className="text-3xl md:text-5xl font-bold mb-8 text-center"
            style={{
              textShadow:
                "0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green",
            }}
          >
            Why Safari?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
           {data.whySafari.map((item, idx) => (
            <div key={idx} className="bg-[#f1f6e9] p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}</div>
        </div>
      </div>

      <div className="bg-[#FBF3B9]">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2
            className="text-3xl md:text-5xl font-bold mb-8 text-center"
            style={{
              textShadow:
                "0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green",
            }}
          >
            Our Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
          {data.successStories.map((story, idx) => (
              <div key={idx} className="bg-white text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
                <img src={story.photo} alt={story.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-bold text-center mb-2">{story.name}</h3>
                <p className="text-center text-sm">“{story.quote}”</p>
              </div>
            ))} </div>
        </section>
      </div>

      <div className="bg-[#FBF3B9]">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2
            className="text-3xl md:text-5xl font-bold mb-8 text-center"
            style={{
              textShadow:
                "0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green",
            }}
          >
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.team.map((member, idx) => (
              <div key={idx} className="bg-white text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
                <img src={member.photo} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-lg font-bold text-center mb-2">{member.name}</h3>
                <p className="text-center text-sm">{member.role}</p>
              </div>
            ))}</div>
        </section>
      </div>

      <ShapeDivider fill="#ffffff" flip  />
    </div>
  );
}
