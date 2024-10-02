import React from "react";
import './style.css'

const ResourceForm = ({ formData, setFormData, handleAdd, handleUpdate, modalMode, selectedResource, handleCancel }) => {
  const categoryOptions = [
    "tanker_truck",
    "rails_tank",
    "tank_wagon",
    "tanker_LNG",
    "bitumen_truck",
  ];
  const statusOptions = ["available", "unavailable"];
  const unitOptions = ["liters", "gallons", "cubic meters"];

  return (
    <form className="resource-form">
      <div>
        <label>Resource Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter resource name"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select
            value={formData.resourceCategory}
            onChange={(e) => setFormData({ ...formData, resourceCategory: e.target.value })}
            required
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

        <div className="form-group">
          <label>Status</label>
          <select
            value={formData.resourceStatus}
            onChange={(e) => setFormData({ ...formData, resourceStatus: e.target.value })}
            required
          >
            <option value="" disabled>
              Select status
            </option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Capacity</label>
          <input
            className="capacity_input"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="Enter capacity"
            required
          />
        </div>

        <div className="form-group">
          <label>Unit</label>
          <select
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            required
          >
            <option value="" disabled>
              Select unit
            </option>
            {unitOptions.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label>Vehicle ID</label>
        <input
          type="text"
          value={formData.vehicleId}
          onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
          placeholder="Enter vehicle ID"
        />
      </div>

      <div className="modal-footer">
        {modalMode === "add" ? (
          <button type="button" onClick={() => handleAdd(formData)} className="add-update-button">
            Add
          </button>
        ) : (
          <button type="button" onClick={() => handleUpdate(selectedResource, formData)} className="add-update-button">
            Update
          </button>
        )}
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
