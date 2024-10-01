// src/components/ResourceView.js
import React from "react";
import './style.css'
const ResourceView = ({ selectedResource }) => {
  return (
    <div className="resource-view">
      <p>
        <strong>ID:</strong> {selectedResource?.id}
      </p>
      <p>
        <strong>Category:</strong> {selectedResource?.resourceCategory}
      </p>
      <p>
        <strong>Status:</strong> {selectedResource?.resourceStatus}
      </p>
    </div>
  );
};

export default ResourceView;
