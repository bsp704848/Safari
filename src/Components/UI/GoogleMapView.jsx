
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
   
    if (!window.google || !mapInstance.current) return;
    
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

      const placesService = new window.google.maps.places.PlacesService(
      mapInstance.current
    );

    let pickupLatLng = null;
    let dropLatLng = null;

    const placeMarker = (placeId, title, icon, callback) => {
      placesService.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const position =  place.geometry.location;
          const marker = new window.google.maps.Marker({
            map: mapInstance.current,
            position,
            title,
            icon,
          });
          callback(position, marker);
        } else {
          console.error("PlacesService.getDetails failed:", status);
        }
      });
    };


  if (pickupLocation && pickupLocation.lat && pickupLocation.lng) {
    const pickupPos = new window.google.maps.LatLng(
      pickupLocation.lat,
      pickupLocation.lng
    );
    pickupLatLng = pickupPos;
    pickupMarkerRef.current = new window.google.maps.Marker({
      map: mapInstance.current,
      position: pickupPos,
      title: pickupLocation.name,
    });
    mapInstance.current.setCenter(pickupPos);
    mapInstance.current.setZoom(12);
    fitBounds();
  } else if (pickupLocation?.placeId) {
    placeMarker(
      pickupLocation.placeId,
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

  if (dropLocation && dropLocation.lat && dropLocation.lng) {
    const dropPos = new window.google.maps.LatLng(
      dropLocation.lat,
      dropLocation.lng
    );
    dropLatLng = dropPos;
    dropMarkerRef.current = new window.google.maps.Marker({
      map: mapInstance.current,
      position: dropPos,
      title: dropLocation.name,
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    });
    fitBounds();
  } else if (dropLocation?.placeId) {
    placeMarker(
      dropLocation.placeId,
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

      routePolylineRef.current = new window.google.maps.Polyline({
        path: decodedPath,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 4,
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