import React, { useState } from 'react';
import GeoLocation from './components/GeoLocation.js'; // Import the GeoLocation component
import './components/App.css'; // Import the CSS file

function App() {
  const [fetchingLocation, setFetchingLocation] = useState(false); // Tracks whether location fetching is in progress
  const [coordinates, setCoordinates] = useState(null); // Stores the fetched coordinates

  const handleClick = () => {
    setFetchingLocation(true); // Set the state to start fetching the location
  };

  const onSaveCoordinates = (data) => {
    // Mocking the API response by directly saving the data locally
    console.log('Mocking API call with data:', data); // Log the data for debugging
    setCoordinates(data); // Save the data for display
    setFetchingLocation(false); // Stop fetching
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GeoLocation Tracker with SPCS</h1>
        <p className="status-message">
          {fetchingLocation
            ? "Fetching your location..." // Show a message while fetching
            : "Click the button to fetch your location."}
        </p>
        <button onClick={handleClick} disabled={fetchingLocation}>
          {fetchingLocation ? "Fetching..." : "Get Location"}
        </button>
        <GeoLocation fetching={fetchingLocation} onSaveCoordinates={onSaveCoordinates} />
        {coordinates && (
          <div className="coordinates-display">
            <p>Latitude: {coordinates.latitude}</p>
            <p>Longitude: {coordinates.longitude}</p>
            {coordinates.statePlaneX !== undefined && coordinates.statePlaneY !== undefined ? (
              <>
                <p>State Plane X: {coordinates.statePlaneX.toFixed(2)}</p>
                <p>State Plane Y: {coordinates.statePlaneY.toFixed(2)}</p>
              </>
            ) : (
              <p>Florida Coordinates are not available.</p>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
