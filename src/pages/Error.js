import React from "react";

const Error = ({ message = "An unexpected error occurred" }) => {
  return (
    <div className="error-container">
      <div className="error-content py-5 my-5">
        <h1 className="error-heading mb-4">{message}</h1>
      </div>
    </div>
  );
};

export default Error;
