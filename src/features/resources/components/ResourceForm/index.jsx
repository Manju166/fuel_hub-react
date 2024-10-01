// src/components/ResourceForm.js
import React from "react";
import './style.css'
const ResourceForm = ({ formData, setFormData, handleAdd, handleUpdate, modalMode, selectedResource }) => {
  const categoryOptions = [
    "tanker_truck",
    "rails_tank",
    "tank_wagon",
    "tanker_LNG",
    "bitumen_truck",
  ];
  const statusOptions = ["available", "unavailable"];

  return (
    <form className="resource-form">
      <div>
        <label>Category</label>
        <select
          value={formData.resourceCategory}
          onChange={(e) => setFormData({ ...formData, resourceCategory: e.target.value })}
        >
          <option value="" disabled>
            Select category
          </option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Status</label>
        <select
          value={formData.resourceStatus}
          onChange={(e) => setFormData({ ...formData, resourceStatus: e.target.value })}
        >
          <option value="" disabled>
            Select Status
          </option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="modal-footer">
        {modalMode === "add" ? (
          <button type="button" onClick={() => handleAdd(formData)}>
            Add
          </button>
        ) : (
          <button type="button" onClick={() => handleUpdate(selectedResource, formData)}>
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default ResourceForm;
