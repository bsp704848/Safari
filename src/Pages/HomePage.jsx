import React, { useState } from "react";
import Hero from "../Components/UI/Hero";
import ServicePage from "../Pages/ServicePage";
import BookingImage from "../assets/images/fastboooking.jpg";
import safeImage from "../assets/images/safedrive.webp";
import affordableImage from "../assets/images/image1.jpg";
import Footer from "../Components/UI/Footer";
import FareCalculator from "../Components/fareCalculator/FareCalculator";
import Loader from "../Components/UI/Loader";

export default function HomePage() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleBookRide = () => {
    if (!pickupLocation || !dropLocation) {
      alert("Please enter both pickup and drop locations!");
      return;
    }
    setLoading(true); 
    setTimeout(() => {
      fetchDistance(pickupLocation, dropLocation);
      setLoading(false); 
    }, 2000); 
  };

  const fetchDistance = (pickup, drop) => {
    if (!window.google || !window.google.maps) {
      alert("Google Maps SDK not loaded.");
      return;
    }
    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: pickup,
        destination: drop,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          const meters = result.routes[0].legs[0].distance.value;
          const km = meters / 1000;
          setDistanceKm(km);
        } else {
          alert("Could not calculate distance.");
        }
      }
    );
  };

  const handleClearInputs = () => {
    setPickupLocation(null);
    setDropLocation(null);
  };

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
      <div className="font-sans">
        {loading && (
                       <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/100">
                           <Loader />
                       </div>
                   )}
        <Hero
          title="India Moves On Safari "
          subtitle="Book your taxi or bike ride in seconds. Fast, safe, and reliable."
          pickupPlaceholder={`Your location${
            location.city ? ` (${location.city})` : ""
          }`}
          dropPlaceholder={`Drop-off location${
            location.city ? ` near ${location.city}` : ""
          }`}
          buttonText="Book a Ride"
          onBookRide={handleBookRide}
          onPickupChange={setPickupLocation}
          onDropChange={setDropLocation}
        />

        {!loading && distanceKm && (
          <FareCalculator distanceKm={distanceKm} onClear={handleClearInputs} />
        )}

        <section className="relative bg-[#FDF3E7] mt-12">
          <ShapeDivider fill="#ffffff" />

          <div className="py-16 px-4 text-center bg-[#FDF3E7] ">
            <div className="max-w-7xl mx-auto">
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 text-center text-black"
                style={{
                  textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`,
                }}
              >
                Why Choose Safari?
              </h2>
              <p className="text-gray-900 max-w-2xl mx-auto mb-12 text-center">
                Safari App lets you book taxis or bikes in just a few taps.
                Affordable fares, real-time tracking, and seamless payments — your
                trusted ride partner!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className=" overflow-hidden transition duration-300 max-w-[300px] mx-auto">
                  <img
                    src={BookingImage}
                    alt="Fast Booking"
                    className="w-full h-48  rounded-2xl object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      Fast Booking
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Book rides instantly without long waits or complicated steps.
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden max-w-[300px] mx-auto">
                  <img
                    src={safeImage}
                    alt="Safe Rides"
                    className="w-full h-48  rounded-2xl object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      Safe Rides
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Our drivers are verified and our rides are tracked for your
                      safety.
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden max-w-[300px] mx-auto">
                  <img
                    src={affordableImage}
                    alt="Affordable Prices"
                    className="w-full h-48 rounded-2xl object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      Affordable Prices
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Enjoy competitive rates for both taxi and bike rides around
                      town.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShapeDivider fill="#ffffff" flip />
        </section>
      </div>
      <ServicePage />
      <Footer />
    </>
  );
}
