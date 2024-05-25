// Error.jsx - A simple component to display errors
import React from 'react';

function Error({ message }) {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
}

export default Error;
