import React from "react";
import './style.css'
import { FaTimes } from "react-icons/fa";

const ResourceView = ({ selectedResource ,onClose}) => {
  return (
    <div className="resource-view">
    <div className="resource-view__header">
      <h2>Resource Details</h2>
      <button className="product-view__close" onClick={onClose}>
          <FaTimes />
        </button>
    </div>
      <p><strong>Name:</strong> {selectedResource?.name}</p>
      <p><strong>Category:</strong> {selectedResource?.resourceCategory}</p>
      <p><strong>Status:</strong> {selectedResource?.resourceStatus}</p>
      <p><strong>Capacity:</strong> {selectedResource?.capacity}</p>
      <p><strong>Unit:</strong> {selectedResource?.unit}</p>
      <p><strong>Vehicle ID:</strong> {selectedResource?.vehicleId}</p>
    </div>
  );
};

export default ResourceView;
