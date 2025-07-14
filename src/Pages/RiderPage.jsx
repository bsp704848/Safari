import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RiderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const rider = location.state?.rider;
  const vehicle = location.state?.vehicle;

  if (!rider) {
    return (
      <div className="p-10 text-center">
        <h2>No rider data found.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-gray-800 text-white rounded-lg"
        >
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200">

        <div className="bg-yellow-400 flex justify-center py-4">
          <span className="text-3xl font-extrabold tracking-wide text-gray-900"
            style={{ fontFamily: 'Coiny', textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green` }}
          >
            Safari
          </span>
        </div>


        <div className="flex justify-center mt-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
            <img
              src={rider.photo}
              alt={rider.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>


        <div className="px-6 py-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {rider.name}
          </h2>
          <p className="text-gray-700 text-sm mt-1 mb-4">
            Your driver is on the way
          </p>

          <div className="text-left mt-4 space-y-2">
            <div className="flex justify-between text-gray-800 font-medium">
              <span>Call for location :</span>
              <span>{rider.contactNumber}</span>
            </div>
          <div className="text-left mt-4 space-y-2">
            <div className="flex justify-between text-gray-800 font-medium">
              <span>Vehicle Type:</span>
              <span>{rider.vehicleType}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-medium">
              <span>Vehicle Model:</span>
              <span>{rider.vehicleModel}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-medium">
              <span>Vehicle Number:</span>
              <span className="font-bold">{rider.vehicleNumber}</span>
            </div>
            {vehicle && (
              <div className="flex justify-between text-gray-800 font-medium">
                <span>Estimated Fare:</span>
                <span>{vehicle.fareRange}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300"
          >
            Back Home
          </button>
        </div>


        <div className="bg-gray-100 text-gray-500 text-xs text-center py-2 mt-4">
          SAFARI Ride Service · All Rights Reserved
        </div>
      </div>
    </div>
    </div>
  );
}
