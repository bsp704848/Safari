import React, { useState, useRef } from "react";
import Loader from "../Components/UI/Loader";
import FareCalculator from "../Components/fareCalculator/FareCalculator";
import backgroundImage from "../assets/images/background.png";
import { MapPin, LocateFixed } from "lucide-react";

export default function RideBooking() {
  const [pickupQuery, setPickupQuery] = useState("");
  const [dropQuery, setDropQuery] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickupDebounceRef = useRef();
  const dropDebounceRef = useRef();
  const suggestionsCache = useRef({});

  const fetchSuggestions = (query, setSuggestions) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    if (suggestionsCache.current[query]) {
      setSuggestions(suggestionsCache.current[query]);
      return;
    }
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      setSuggestions([]);
      return;
    }
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input: query },
      (predictions, status) => {
        if (
          status !== window.google.maps.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          setSuggestions([]);
          return;
        }
        const places = predictions.map((prediction) => ({
          name: prediction.description,
          place_id: prediction.place_id,
        }));
        suggestionsCache.current[query] = places;
        setSuggestions(places);
      }
    );
  };

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickupQuery(value);
    if (pickupDebounceRef.current) clearTimeout(pickupDebounceRef.current);
    pickupDebounceRef.current = setTimeout(() => {
      fetchSuggestions(value, setPickupSuggestions);
    }, 400);
  };

  const handleDropChange = (e) => {
    const value = e.target.value;
    setDropQuery(value);
    if (dropDebounceRef.current) clearTimeout(dropDebounceRef.current);
    dropDebounceRef.current = setTimeout(() => {
      fetchSuggestions(value, setDropSuggestions);
    }, 400);
  };

  const handlePickupSelect = (place) => {
    setPickupQuery(place.name);
    setPickupSuggestions([]);
    setPickupLocation(place.name);
  };

  const handleDropSelect = (place) => {
    setDropQuery(place.name);
    setDropSuggestions([]);
    setDropLocation(place.name);
  };

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
    setPickupQuery("");
    setDropQuery("");
    setDistanceKm(null);
  };

  return (
    <div className="font-sans min-h-screen mt-8">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/100">
          <Loader />
        </div>
      )}
      <section
        className="relative text-black min-h-[60vh] flex flex-col justify-center items-center text-center px-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-2xl w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6"
            style={{
              textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`
            }}
          >
            India Moves On Safari
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Book your taxi or bike ride in seconds. Fast, safe, and reliable.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
            <div className="relative flex-1">
              <div className="relative flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-gray-900">
                <MapPin className="text-orange-600 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Your location"
                  className="flex-1 text-black bg-transparent focus:outline-none pr-8"
                  value={pickupQuery}
                  onChange={handlePickupChange}
                />
                {pickupQuery && (
                  <button
                    onClick={() => {
                      setPickupQuery("");
                      setPickupSuggestions([]);
                      setPickupLocation(null);
                    }}
                    className="absolute right-4 text-gray-900 font-bold hover:text-black"
                  >
                    &#x2715;
                  </button>
                )}
              </div>
              {pickupSuggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-md mt-2 w-full z-10 max-h-60 overflow-y-auto text-left">
                  {pickupSuggestions.map((place, index) => (
                    <li
                      key={index}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handlePickupSelect(place)}
                    >
                      <span className="font-medium">{place.name.split(",")[0]}</span>
                      <br />
                      <span className="text-gray-500 text-xs">
                        {place.name.substring(place.name.indexOf(",") + 1)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative flex-1">
              <div className="relative flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-gray-900">
                <LocateFixed className="text-orange-600 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Drop-off location"
                  className="flex-1 text-black bg-transparent focus:outline-none pr-8"
                  value={dropQuery}
                  onChange={handleDropChange}
                />
                {dropQuery && (
                  <button
                    onClick={() => {
                      setDropQuery("");
                      setDropSuggestions([]);
                      setDropLocation(null);
                    }}
                    className="absolute right-4 text-gray-900 font-bold hover:text-black"
                  >
                    &#x2715;
                  </button>
                )}
              </div>
              {dropSuggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-md mt-2 w-full z-10 max-h-60 overflow-y-auto text-left">
                  {dropSuggestions.map((place, index) => (
                    <li
                      key={index}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDropSelect(place)}
                    >
                      <span className="font-medium">{place.name.split(",")[0]}</span>
                      <br />
                      <span className="text-gray-500 text-xs">
                        {place.name.substring(place.name.indexOf(",") + 1)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button
            onClick={handleBookRide}
            className="bg-gray-900 text-white font-medium py-3 px-8 rounded-lg hover:rounded-full transition-all duration-300 ease-in-out shadow-lg"
          >
            Book a Ride
          </button>
        </div>
      </section>
      {!loading && distanceKm && (
        <FareCalculator distanceKm={distanceKm} onClear={handleClearInputs} />
      )}
    </div>
  );
}