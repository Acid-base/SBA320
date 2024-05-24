// main.jsx - 
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import the main App component
import './index.css';

// Render the App component into the 'root' element in your HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

