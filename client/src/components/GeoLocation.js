import React, { useState, useEffect } from 'react';
import proj4 from 'proj4';

// Define the projection for WGS84 (latitude and longitude) and the Florida East zone
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
proj4.defs(
  "EPSG:2236",
  "+proj=tmerc +lat_0=24.33333333333333 +lon_0=-81 +k=0.999941177 +x_0=200000.0001016 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=us-ft +no_defs"
);

// Function to convert latitude/longitude to State Plane Coordinates
function latLonToStatePlane(latitude, longitude) {
  const coordinates = proj4("EPSG:4326", "EPSG:2236", [longitude, latitude]);
  return { x: coordinates[0], y: coordinates[1] };
}

function GeoLocation({ fetching, onSaveCoordinates }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetching) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLatitude(lat);
            setLongitude(lon);

            // Convert latitude/longitude to Florida Coordinate System
            const spcsCoordinates = latLonToStatePlane(lat, lon);

            // Log the Florida Coordinates for debugging
            console.log("State Plane Coordinates:", spcsCoordinates);

            // Pass the geographic and SPCS coordinates to the parent component
            onSaveCoordinates({
              latitude: lat,
              longitude: lon,
              statePlaneX: spcsCoordinates.x,
              statePlaneY: spcsCoordinates.y,
            });
          },
          (err) => {
            setError(err.message);
            console.error("Error fetching geolocation:", err);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        console.error("Geolocation is not supported by your browser.");
      }
    }
  }, [fetching, onSaveCoordinates]);

  return (
    <div>
      <h2>Geolocation Information</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {latitude && longitude && (
            <p>
              Latitude: {latitude}, Longitude: {longitude}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default GeoLocation;