import React from "react";
import "leaflet/dist/leaflet.css"
import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// For at lave et nyt icon, og flytte midterpunktet
const newIcon= L.icon({iconUrl: icon.src, shadowUrl: iconShadow.src, iconAnchor: [12, 41] })

export default function LeafletMap({position}:{position: LatLngTuple}) {
  return (
      <MapContainer className="mapContainer z-0" center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={newIcon}>
        </Marker>
      </MapContainer>

  );
}
