// MushroomCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import placeholderImage from '../assets/istockphoto-503491608-2048x2048.jpg'; // Import your placeholder image
import './MushroomCard.css';

function MushroomCard({ mushroom, isSelected, onSelect }) { 
  const [showDetails, setShowDetails] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const imageRef = useRef(null);

  const originalImageUrl = mushroom.primary_image?.original_url;
  useEffect(() => {
    // Only fetch the image if the card is selected
    if (isSelected) {
      const img = imageRef.current;

      const loadImage = async () => {
        if (img && originalImageUrl) {
          try {
            const response = await fetch(originalImageUrl);
            if (!response.ok) {
              throw new Error('Failed to fetch image.');
            }
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);
            setImageUrl(objectURL);
          } catch (error) {
            console.error('Error loading image:', error);
            // Handle image loading error (e.g., set a placeholder image)
          }
        }
      };

      loadImage();

      return () => {
        // Clean up the object URL when the component unmounts
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    }
  }, [isSelected, originalImageUrl]);

  const handleCardClick = () => {
    onSelect(mushroom.id);
  };
  return (
    <li
      className="mushroom-card"
      onClick={handleCardClick} // Call handleCardClick on click
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {isSelected && imageUrl ? ( // Only display if selected and image is loaded
        <img ref={imageRef} src={imageUrl} alt={mushroom.name} />
      ) : (
        <img src={placeholderImage} alt="Loading..." /> // Placeholder 
      )}
      <h3>{mushroom.name}</h3>

      {showDetails && (
        <div className="details-card">
          {/* Add more details as needed based on your API response structure: */}
          <p>
            <strong>Scientific Name:</strong> {mushroom.scientific_name}
          </p>
          <p>
            <strong>Description:</strong>{' '}
            {mushroom.description || 'No description available.'}
          </p>
          {/* ... other details */}
        </div>
      )}
    </li>
  );
}

export default MushroomCard;
