import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ item }) => {
  const [showGoogleMap, setShowGoogleMap] = useState(false);
  const [showOpenStreetMap, setShowOpenStreetMap] = useState(false);

  const handleShowGoogleMap = () => {
    setShowGoogleMap(true);
    setShowOpenStreetMap(false);
  };

  const handleShowOpenStreetMap = () => {
    setShowGoogleMap(false);
    setShowOpenStreetMap(true);
  };

  return (
    <div>
      <div>
        <button onClick={handleShowGoogleMap}>Show Google Maps</button>
        <button onClick={handleShowOpenStreetMap}>Show OpenStreetMap</button>
      </div>

      {showGoogleMap && (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            center={{ lat: 51.507351, lng: -0.127758 }}
            zoom={12}
            mapContainerStyle={{ height: '400px', width: '600px' }}
          >
            <Marker position={{ lat: 51.507351, lng: -0.127758 }} />
          </GoogleMap>
        </LoadScript>
      )}

      {showOpenStreetMap && (
        <MapContainer
          center={[51.507351, -0.127758]}
          zoom={12}
          style={{ height: '400px', width: '600px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[51.507351, -0.127758]}>
            <Popup>
              <a href={item.maps.openStreetMaps}>OpenStreetMap</a>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
