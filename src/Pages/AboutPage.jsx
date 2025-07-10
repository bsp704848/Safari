import React from "react";
import Footer from "../Components/UI/Footer";

export default function AboutPage() {
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
    <>
      {/* Section: WHY SAFARI */}
      <div className="text-gray-900 min-h-screen bg-[#CAE0AC]">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              textShadow:
                "0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green",
            }}
          >
            About Safari
          </h1>
          <p className="text-lg md:text-xl">
            The Future of Bike Taxi Rides, Faster and Safer.
          </p>
        </div>

        <ShapeDivider fill="#ffffff" />

        <section className="max-w-6xl mx-auto px-4 py-12">
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
            <div className="bg-[#f1f6e9] text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p>
                To redefine urban commuting with sustainable, affordable, and
                lightning-fast bike taxi rides for everyone.
              </p>
            </div>
            <div className="bg-[#f1f6e9] text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-3">Our Strategy</h3>
              <p>
                Empower riders and passengers with technology-driven solutions
                ensuring safety, fair prices, and seamless experiences.
              </p>
            </div>
            <div className="bg-[#f1f6e9] text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-3">Our Goals</h3>
              <p>
                Connect millions with reliable bike taxi rides, reducing traffic
                congestion and creating economic opportunities.
              </p>
            </div>
          </div>
        </section>

        <ShapeDivider fill="#ffffff" flip />
      </div>

      {/* Section: OUR SUCCESS STORIES */}
      <div className="bg-white">
        <section className="max-w-6xl mx-auto px-4 py-12">
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
            <div className="bg-white text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="John"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-center mb-2">John M.</h3>
              <p className="text-center text-sm">
                “Safari helped me earn a stable income while giving me freedom
                over my work schedule. Life-changing!”
              </p>
            </div>
            <div className="bg-white text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="Priya"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-center mb-2">Priya S.</h3>
              <p className="text-center text-sm">
                “I save hours daily commuting with Safari. It’s fast, safe, and
                surprisingly affordable.”
              </p>
            </div>
            <div className="bg-white text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <img
                src="https://randomuser.me/api/portraits/men/55.jpg"
                alt="Rajesh"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-center mb-2">Rajesh K.</h3>
              <p className="text-center text-sm">
                “As a driver, I feel respected and valued by Safari’s fair pay
                policies and rider safety standards.”
              </p>
            </div>
          </div>
        </section>

        <ShapeDivider fill="#CAE0AC" />
      </div>

      {/* Section: MEET OUR TEAM */}
      <div className="bg-[#CAE0AC]">
        <section className="max-w-6xl mx-auto px-4 py-12">
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
            <div className="bg-[#f1f6e9] text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Ananya"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-center mb-2">
                Ananya D.
              </h3>
              <p className="text-center text-sm">
                Chief Operations Officer, ensuring smooth rides and happy
                customers.
              </p>
            </div>
            <div className="bg-[#f1f6e9] text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <img
                src="https://randomuser.me/api/portraits/men/22.jpg"
                alt="Ravi"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-center mb-2">
                Ravi K.
              </h3>
              <p className="text-center text-sm">
                Lead Engineer, passionate about building seamless experiences
                for riders and drivers.
              </p>
            </div>
            <div className="bg-[#f1f6e9] text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
              <img
                src="https://randomuser.me/api/portraits/women/29.jpg"
                alt="Neha"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-center mb-2">
                Neha S.
              </h3>
              <p className="text-center text-sm">
                Marketing Manager, dedicated to spreading the Safari vision
                far and wide.
              </p>
            </div>
          </div>
        </section>

        <ShapeDivider fill="#ffffff" flip />
      </div>

      <Footer />
    </>
  );
}
