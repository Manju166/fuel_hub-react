import React from "react";
import './style.css'
const ProductForm = ({ formData, setFormData, categoryOptions, statusOptions, unitOptions, handleSubmit, errorMessage, handleCancel }) => {
  return (
    
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          {categoryOptions.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
      <div>
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
      <div className="modal-buttons">
        <button type="submit">
          {formData.mode === "add" ? "Add" : "Update"} Product
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
