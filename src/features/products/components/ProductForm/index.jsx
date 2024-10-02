import React from "react";
import './style.css';

const ProductForm = ({
  formData,
  setFormData,
  categoryOptions,
  statusOptions,
  unitOptions,
  handleSubmit,
  errorMessage,
  handleCancel,
}) => {
  return (
    <form className="product-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      {errorMessage && <p className="product-form__error-message">{errorMessage}</p>}
      
      <div className="product-form__field">
        <label className="product-form__label">Name</label>
        <input
          className="product-form__input"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          
        />
      </div>
      
      <div className="product-form__field">
        <label className="product-form__label">Category</label>
        <select
          className="product-form__select"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          
        >
          {categoryOptions.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="product-form__field">
        <label className="product-form__label">Status</label>
        <select
          className="product-form__select"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          
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
      
      <div className="product-form__field">
        <label className="product-form__label">Unit</label>
        <select
          className="product-form__select"
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
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

      <div className="product-form__buttons">
        <button type="submit" className="product-form__button--primary">
          {formData.mode === "add" ? "Add" : "Update"} 
        </button>
        <button type="button" className="product-form__button--cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
