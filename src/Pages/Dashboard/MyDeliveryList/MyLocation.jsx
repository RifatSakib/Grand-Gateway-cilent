import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Manually set the marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default Leaflet icon size
  iconAnchor: [12, 41], // Positioning
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MyLocation = ( {deliveryAddressLatitude,deliveryAddresslongitude}) => {
 
 
  const latitude = parseFloat(deliveryAddressLatitude);
  const longitude = parseFloat(deliveryAddresslongitude);
console.log(latitude,longitude)
  const position = [latitude, longitude]; // Dhaka, Bangladesh
  const [showMap, setShowMap] = useState(true);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {showMap && (
        <div style={{ height: "400px", width: "100%", position: "relative" }}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
          
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
              <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
            </Marker>
          </MapContainer>

        
        </div>
      )}

      {!showMap && (
        <button
          onClick={() => setShowMap(true)}
          style={{
            marginTop: "10px",
            background: "green",
            color: "white",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Open Map
        </button>
      )}
    </div>
  );
};

export default MyLocation;
