import React from "react";
import Hero from "../Components/UI/Hero";
import aboutImage from "../assets/images/about.jpg";
import teamImage from "../assets/images/team.jpg";
import Footer from "../Components/UI/Footer";

export default function AboutPage() {
    return (
      <>
        <div className=" text-gray-900 min-h-screen">
 
      <Hero
        title="About Safari"
        subtitle="The Future of Bike Taxi Rides, Faster and Safer."
        image={aboutImage}
      />


      <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center"
                    style={{
                      textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`
                      }}
            >
          Why Safari?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-yellow-200 text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p>
              To redefine urban commuting with sustainable, affordable, and
              lightning-fast bike taxi rides for everyone.
            </p>
          </div>
          <div className="bg-yellow-200 text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-3">Our Strategy</h3>
            <p>
              Empower riders and passengers with technology-driven solutions
              ensuring safety, fair prices, and seamless experiences.
            </p>
          </div>
          <div className="bg-yellow-200 text-black p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-3">Our Goals</h3>
            <p>
              Connect millions with reliable bike taxi rides, reducing traffic
              congestion and creating economic opportunities.
            </p>
          </div>
        </div>
      </section>


      <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center"
              style={{
                textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`
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
            <h3 className="text-lg font-bold text-center mb-2">
              John M.
            </h3>
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
            <h3 className="text-lg font-bold text-center mb-2">
              Priya S.
            </h3>
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
            <h3 className="text-lg font-bold text-center mb-2">
              Rajesh K.
            </h3>
            <p className="text-center text-sm">
              “As a driver, I feel respected and valued by Safari’s fair pay
              policies and rider safety standards.”
            </p>
          </div>
        </div>
      </section>


      <Hero
              title="Meet Our Team"
              subtitle="A passionate crew dedicated to transforming urban mobility for millions."
              image={teamImage }
      />
      </div>
            <Footer />
            </>
  );
}
