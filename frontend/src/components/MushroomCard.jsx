// src/components/MushroomCard.jsx - Component for displaying a single mushroom card

import React, { useEffect, useRef, useState } from 'react';
import placeholderImage from '../assets/istockphoto-503491608-2048x2048.jpg'; // Placeholder image
import './MushroomCard.css'; // Import CSS for styling

// Functional component for MushroomCard
function MushroomCard({ mushroom, isSelected, onSelect }) {
  // State to manage showing details
  const [showDetails, setShowDetails] = useState(false); 
  // State to manage the image URL
  const [imageUrl, setImageUrl] = useState(null); 
  // Create a ref to access the image element directly
  const imageRef = useRef(null); 

  // Get the original image URL from the mushroom data
  const originalImageUrl = mushroom.primary_image?.original_url; 

  // useEffect to handle fetching and displaying the image when 'isSelected' changes
  useEffect(() => {
    // Only fetch and set the image if the card is selected
    if (isSelected) {
      // Get the image element from the ref
      const img = imageRef.current; 

      // Define an async function to load the image
      const loadImage = async () => {
        // Proceed if the image element and original URL exist
        if (img && originalImageUrl) {
          try {
            // Fetch the image from the URL
            const response = await fetch(originalImageUrl); 
            // Check if the fetch was successful
            if (!response.ok) {
              // Throw an error if the fetch failed
              throw new Error('Failed to fetch image.'); 
            }
            // Convert the response to a Blob (Binary Large Object)
            const blob = await response.blob(); 
            // Create an object URL from the Blob, which can be used as an image source
            const objectURL = URL.createObjectURL(blob); 
            // Update the 'imageUrl' state with the newly created object URL
            setImageUrl(objectURL); 
          } catch (error) {
            // Log the error to the console if image loading fails
            console.error('Error loading image:', error); 
            // Handle the image loading error appropriately 
            // (e.g., set a default placeholder image)
          }
        }
      };

      // Call the async 'loadImage' function to start loading the image
      loadImage();

      // Cleanup function to revoke the object URL when the component unmounts
      // This is important to prevent memory leaks
      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl); 
        }
      };
    }
  }, [isSelected, originalImageUrl]); // Only re-run the effect if 'isSelected' or 'originalImageUrl' changes

  // Function to handle clicks on the card
  const handleCardClick = () => {
    // Call the 'onSelect' prop (passed from the parent component) with the mushroom's ID
    onSelect(mushroom.id);
  };

  // JSX to render the mushroom card
  return (
    <li
      className="mushroom-card"
      onClick={handleCardClick} // Call 'handleCardClick' when the card is clicked
      onMouseEnter={() => setShowDetails(true)} // Show details on mouse enter
      onMouseLeave={() => setShowDetails(false)} // Hide details on mouse leave
    >
      {/* Conditionally render the image based on selection and image loading */}
      {isSelected && imageUrl ? ( 
        <img ref={imageRef} src={imageUrl} alt={mushroom.name} />
      ) : (
        // Render a placeholder image while loading or if not selected
        <img src={placeholderImage} alt="Loading..." /> 
      )}
      {/* Display the mushroom name */}
      <h3>{mushroom.name}</h3> 

      {/* Conditionally render the details card */}
      {showDetails && ( 
        <div className="details-card">
          {/* Display additional mushroom details */}
          <p>
            <strong>Scientific Name:</strong> {mushroom.scientific_name} 
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {mushroom.description || 'No description available.'} 
          </p>
          {/* ... other details can be added here */}
        </div>
      )}
    </li>
  );
}

// Export the MushroomCard component as the default export
export default MushroomCard;
