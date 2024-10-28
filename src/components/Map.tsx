import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMarker: React.FC<{ position: [number, number] | null }> = ({ position }) => {
  return position ? (
    <Marker position={position}>
      <Popup>
        Current Location: {position[0]}, {position[1]}
      </Popup>
    </Marker>
  ) : null;
};

const MapComponent: React.FC<{ position: [number, number] | null }> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  return null;
};

export const Map: React.FC<{ position: [number, number] | null }> = ({ position }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapComponent position={position} />
      <LocationMarker position={position} />
    </MapContainer>
  );
};
