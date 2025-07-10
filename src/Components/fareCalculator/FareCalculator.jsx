import React, { useState } from "react";
import { VEHICLES } from "../../data/vehicles";
import { RIDERS } from "../../data/riders";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import Loader from "../UI/Loader";

const VEHICLE_TYPE_MAP = {
  bike: "Bike",
  auto: "Rickshaw",
  cab: "Taxi",
  "cab-premium": "Taxi", 
};

export default function FareCalculator({ distanceKm, onClear }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const fares = VEHICLES.map((vehicle) => {
    const minFare = (distanceKm * vehicle.minFarePerKm).toFixed(2);
    const maxFare = (distanceKm * vehicle.maxFarePerKm).toFixed(2);
    return {
      ...vehicle,
      fareRange: `\u20B9 ${minFare}  – \u20B9 ${maxFare} `,
    };
  });

  const handleContinue = (vehicle) => {
    if (!vehicle) {
      toast.error("Please select a vehicle!");
      return;
    }
    setLoading(true); 
    setTimeout(() => {
      const riderType = VEHICLE_TYPE_MAP[vehicle.type];
      const filteredRiders = RIDERS.filter(rider => rider.vehicleType.toLowerCase() === riderType.toLowerCase());

      if (filteredRiders.length === 0) {
        if (RIDERS.length > 0) {
          const fallbackRider = RIDERS[Math.floor(Math.random() * RIDERS.length)];
          toast.error("No exact match for selected vehicle type. Assigning a random available rider.");
          navigate("/rider", { state: { rider: fallbackRider, vehicle } });
          if (typeof onClear === "function") onClear();
          setLoading(false);
          return;
        } else {
          toast.error("No available riders at all!");
          setLoading(false);
          return;
        }
      }

      const randomIndex = Math.floor(Math.random() * filteredRiders.length);
      const rider = filteredRiders[randomIndex];

      navigate("/rider", { state: { rider, vehicle } });
      if (typeof onClear === "function") onClear();
      setLoading(false);
    }, 2000); 
  };

  if (!distanceKm) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 text-black">
     {loading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/100">
                        <Loader />
                    </div>
                )}
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
        Estimated Fares for {distanceKm.toFixed(2)} km
      </h2>

      <div className="space-y-2">
        {fares.map((vehicle) => (
          <div
            key={vehicle.name}
            className={`text-black flex justify-between items-center p-3 rounded-xl shadow-md hover:scale-[1.02] transition-transform cursor-pointer
            ${selectedVehicle?.name === vehicle.name ? 'ring-2 ring-orange-500' : ''}`}
            onClick={() => setSelectedVehicle(vehicle)}
          >
            <div className="flex items-center gap-4">
              <img
                src={vehicle.icon}
                alt={vehicle.name}
                className="w-16 h-14 object-cover rounded-md flex-shrink-0 shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              <span className="text-lg md:text-base font-semibold">
                {vehicle.name}
              </span>
            </div>
            <p className="text-lg md:text-base font-semibold">
              {vehicle.fareRange}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-gray-900 text-white text-base md:text-lg px-6 font-semibold py-3 rounded-lg hover:rounded-full transition-all duration-300 ease-in-out mt-4"
          onClick={() => handleContinue(selectedVehicle)}
          disabled={!selectedVehicle}
        >
          Continue
        </button>
      </div>
    </section>
  );
}
