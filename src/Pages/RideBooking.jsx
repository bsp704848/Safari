
import React, { useState, useRef, useEffect, } from "react";
import Loader from "../Components/UI/Loader";
import FareCalculator from "../Components/fareCalculator/FareCalculator";
import backgroundImage from "../assets/images/background.png";
import { MapPin, LocateFixed } from "lucide-react";
import GoogleMapView from "../Components/UI/GoogleMapView";

export default function RideBooking() {
  const [pickupQuery, setPickupQuery] = useState("");
  const [dropQuery, setDropQuery] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [routePolyline, setRoutePolyline] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);


  const pickupDebounceRef = useRef();
  const dropDebounceRef = useRef();
  const suggestionsCache = useRef({});

  function savePendingRide(data) {
    const pendingRide = JSON.parse(localStorage.getItem("pendingRide")) || {};
    const updatedRide = { ...pendingRide, ...data };
    localStorage.setItem("pendingRide", JSON.stringify(updatedRide));
  }

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
    const updatedPickup = {
      name: place.name,
      placeId: place.place_id,
    };
    setPickupLocation(updatedPickup);

    savePendingRide({
      pickupQuery: place.name,
      pickupLocation: updatedPickup,
    });

  };

  const handleDropSelect = (place) => {
    setDropQuery(place.name);
    setDropSuggestions([]);
    const updatedDrop = {
      name: place.name,
      placeId: place.place_id,
    };
    setDropLocation(updatedDrop);

    savePendingRide({
      dropQuery: place.name,
      dropLocation: updatedDrop,
    });

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
        origin: { placeId: pickup.placeId },
        destination: { placeId: drop.placeId },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {

          const route = result.routes[0];

          const overviewPolyline = route.overview_polyline?.points;

          const steps = route.legs[0].steps;

          let polyline = overviewPolyline;

          if (!polyline) {

            let fullPath = [];

            steps.forEach((step) => {
              if (step.polyline?.points) {
                const segmentPath = window.google.maps.geometry.encoding.decodePath(
                  step.polyline.points
                );
                fullPath.push(...segmentPath);
              }
            });

            if (fullPath.length > 0) {
              polyline = window.google.maps.geometry.encoding.encodePath(fullPath);
            } else {
              polyline = null;
            }
          }

          if (polyline) {
            setRoutePolyline(polyline);
          }

          const meters = route.legs[0].distance.value;
          if (meters) {
            setDistanceKm(meters / 1000);
          }

          const pickupLatLng = route.legs[0].start_location;
          const dropLatLng = route.legs[0].end_location;

          const enrichedPickup = {
            ...pickup,
            lat: pickupLatLng.lat(),
            lng: pickupLatLng.lng(),
          };

          const enrichedDrop = {
            ...drop,
            lat: dropLatLng.lat(),
            lng: dropLatLng.lng(),
          };

          setPickupLocation(enrichedPickup);
          setDropLocation(enrichedDrop);

          savePendingRide({
            pickupLocation: enrichedPickup,
            dropLocation: enrichedDrop,
            routePolyline: polyline,
            distanceKm: meters / 1000,
          });
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
    setRoutePolyline(null);
    localStorage.removeItem("pendingRide");
  };

  useEffect(() => {
    const pendingRide = JSON.parse(localStorage.getItem("pendingRide"));
    if (pendingRide) {
      setPickupQuery(pendingRide.pickupQuery || "");
      setDropQuery(pendingRide.dropQuery || "");
      setPickupLocation(pendingRide.pickupLocation || null);
      setDropLocation(pendingRide.dropLocation || null);
      setRoutePolyline(pendingRide.routePolyline || null);
      setDistanceKm(pendingRide.distanceKm || null);
      setSelectedVehicle(pendingRide.selectedVehicle || null)

      if (pendingRide.pickupLocation && pendingRide.dropLocation) {
        fetchDistance(
          pendingRide.pickupLocation,
          pendingRide.dropLocation
        );
      }
    }
  }, []);

  return (
    <div className="min-h-screen mt-8">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/100">
          <Loader />
        </div>
      )}
      <section
        className="relative text-black min-h-[60vh] flex justify-center items-center text-center px-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10  max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left w-full">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6"
              style={{
                textShadow: `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`
              }}
            >
              India Moves On Safari
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Book your taxi or bike ride in seconds. Fast, safe, and reliable.
            </p>
            <div className="relative w-full mb-4">
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
            <div className="relative w-full mb-8">
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
            <button
              onClick={handleBookRide}
              className="py-3 px-8 duration-300 ease-in-out shadow-lg font-semibold  transition-all bg-black text-white rounded-full hover:bg-gray-800"
            >
              Book a Ride
            </button>
          </div>
          <div className="w-full h-[400px] md:h-full">
            <GoogleMapView
              pickupLocation={pickupLocation}
              dropLocation={dropLocation}
              routePolyline={routePolyline}
            />
          </div>
        </div>
      </section>
      {!loading && distanceKm && (
        <FareCalculator distanceKm={distanceKm} onClear={handleClearInputs} defaultVehicle={selectedVehicle} />
      )}
    </div>
  );
}