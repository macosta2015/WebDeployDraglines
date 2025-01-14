import React, { useState } from 'react';
import axios from 'axios';
import GeoLocation from './components/GeoLocation.js';

function App() {
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const handleClick = () => {
    setFetchingLocation(true);
  };

  const onSaveCoordinates = async (data) => {
    try {
      await axios.post('https://draglines-location-59e04617b209.herokuapp.com/', data);
      setCoordinates(data); // Save the data for display
      console.log('Coordinates saved:', data);
    } catch (error) {
      console.error('Error saving coordinates:', error);
    } finally {
      setFetchingLocation(false);
    }
  };

  return (
    <div className="App">
      <style>
        {`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f0f4f8;
          }
          .App {
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #74ebd5, #acb6e5);
            color: #333;
          }
          .App-header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 500px;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 20px;
            color: #333;
          }
          button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #0056b3;
          }
          .coordinates-display {
            margin-top: 20px;
            font-size: 1rem;
            color: #555;
          }
          .status-message {
            margin-top: 10px;
            font-size: 1rem;
            color: #888;
          }
        `}
      </style>

      <header className="App-header">
        <h1>GeoLocation Tracker with SPCS</h1>
        <p className="status-message">
          {fetchingLocation
            ? "Fetching your location..."
            : "Click the button to fetch your location."}
        </p>
        <button onClick={handleClick} disabled={fetchingLocation}>
          {fetchingLocation ? "Fetching..." : "Get Location"}
        </button>
        <GeoLocation fetching={fetchingLocation} onSaveCoordinates={onSaveCoordinates} />
        {coordinates && (
          <p className="coordinates-display">
            Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
            <br />
            State Plane X: {coordinates.statePlaneX.toFixed(2)}, Y: {coordinates.statePlaneY.toFixed(2)}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;

