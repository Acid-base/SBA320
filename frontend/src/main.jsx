// main.jsx - 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MushroomProvider } from './context/MushroomContext'; // Import the provider
import App from './App'; 
import './index.css';

// Render the App component into the 'root' element in your HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MushroomProvider> 
      <App /> 
    </MushroomProvider>
  </React.StrictMode>,
);
