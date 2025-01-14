import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const handleClick = async () => {
    setFetchingLocation(true);
    try {
      const { latitude, longitude } = await getGeoLocation();
      setCoordinates({ latitude, longitude });
      onSaveCoordinates({ latitude, longitude });
      console.log("Coordinates saved:", { latitude, longitude });
    } catch (error) {
      console.error('Error saving coordinates:', error);
    } finally {
      setFetchingLocation(false);
    }
  };

  const onSaveCoordinates = async (data) => {
    try {
      await axios.post('https://draglines-location-59e04617b209.herokuapp.com/', data);
    } catch (error) {
      console.error('Error saving coordinates:', error);
    }
  };

  const getGeoLocation = async () => {
    return { latitude: 27.994402, longitude: -81.760254 }; // Example coordinates for Florida
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
        <h1>GeoLocation Tracker</h1>
        <p className="status-message">
          {fetchingLocation
            ? "Fetching your location..."
            : "Click the button to fetch your location."}
        </p>
        <button onClick={handleClick}>Get Location</button>
        {coordinates && (
          <p className="coordinates-display">
            Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;





// import React, { useState } from 'react';
// import axios from 'axios'; // Import Axios
// import GeoLocation from './components/GeoLocation.js'; // Import the GeoLocation component
// import Button from './components/Example.js'; // Import the Button component

// function App() {
//   const [fetchingLocation, setFetchingLocation] = useState(false);
//   const [coordinates, setCoordinates] = useState(null);

//   const handleClick = async () => {
//     setFetchingLocation(true);
//     try {
//       // Assume GeoLocation returns an object with latitude and longitude
//       const { latitude, longitude } = await getGeoLocation();
//       setCoordinates({ latitude, longitude });

//       // Save coordinates to the backend
//       onSaveCoordinates({ latitude, longitude }); // Call onSaveCoordinates to send data to backend

//       console.log("Coordinates saved:", { latitude, longitude });
//     } catch (error) {
//       console.error('Error saving coordinates:', error);
//     } finally {
//       setFetchingLocation(false);
//     }
//   };

//   const onSaveCoordinates = async (data) => {
//     try {
//       // Make a POST request to the backend endpoint '/Draglines'
//       await axios.post('https://draglines-location-59e04617b209.herokuapp.com/', data); // Update the URL to match your backend endpoint
//       // await axios.post('http://localhost:3000/Draglines', data); // Update the URL to match your backend endpoint
//     } catch (error) {
//       console.error('Error saving coordinates:', error);
//     }
//   };

//   const getGeoLocation = async () => {
//     // Simulated function to get geolocation
//     return { latitude: 27.994402, longitude: -81.760254 }; // Example coordinates for Florida
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <GeoLocation fetching={fetchingLocation} onSaveCoordinates={onSaveCoordinates} /> {/* Pass onSaveCoordinates as prop */}
//         <Button onClick={handleClick} />
//       </header>
//     </div>
//   );
// }

// export default App;

