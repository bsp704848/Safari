import React, { useEffect, useRef } from 'react';

export default function GoogleMapView({ pickupLocation, dropLocation, routePolyline, }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropMarkerRef = useRef(null);
  const routePolylineRef = useRef(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 21.170240, lng: 72.831062 },
      zoom: 10,
    });
  }, []);

  useEffect(() => {
   

    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setMap(null);
      pickupMarkerRef.current = null;
    }
    if (dropMarkerRef.current) {
      dropMarkerRef.current.setMap(null);
      dropMarkerRef.current = null;
    }
    if (routePolylineRef.current) {
      routePolylineRef.current.setMap(null);
      routePolylineRef.current = null;
    }

    const geocoder = new window.google.maps.Geocoder();

    const placeMarker = (address, title, icon, callback) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const position = results[0].geometry.location;
          const marker = new window.google.maps.Marker({
            map: mapInstance.current,
            position,
            title,
            icon,
          });
          callback(position, marker);
        }
      });
    };

    let pickupLatLng = null;
    let dropLatLng = null;

    if (pickupLocation) {
      placeMarker(
        pickupLocation,
        'Pickup Location',
        null,
        (pos, marker) => {
          pickupLatLng = pos;
          pickupMarkerRef.current = marker;
          mapInstance.current.setCenter(pos);
          mapInstance.current.setZoom(12);
          fitBounds();
        }
      );
    }

    if (dropLocation) {
      placeMarker(
        dropLocation,
        'Drop Location',
        'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        (pos, marker) => {
          dropLatLng = pos;
          dropMarkerRef.current = marker;
          fitBounds();

        }
      );
    }

    function fitBounds() {
      if (pickupLatLng && dropLatLng) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(pickupLatLng);
        bounds.extend(dropLatLng);
        mapInstance.current.fitBounds(bounds);
      }
    }

    if (routePolyline) {
      try{
      const decodedPath = window.google.maps.geometry.encoding.decodePath(routePolyline);

      console.log("Drawing polyline:", routePolyline);
      console.log("Decoded path:", decodedPath);

      routePolylineRef.current = new window.google.maps.Polyline({
        path: decodedPath,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: mapInstance.current,
      });

      const bounds = new window.google.maps.LatLngBounds();
      decodedPath.forEach((latlng) => bounds.extend(latlng));
        mapInstance.current.fitBounds(bounds);
      } catch (error) {
         console.error("Polyline decoding failed:", error);
        }
    }
  }, [pickupLocation, dropLocation, routePolyline]);


  return (
    <div className="w-full h-[400px] rounded-xl shadow-lg" ref={mapRef} />
  );
}
