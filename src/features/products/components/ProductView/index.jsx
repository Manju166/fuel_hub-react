import React from "react";
import { FaTimes } from "react-icons/fa"; 
import './style.css';

const ProductView = ({ selectedProduct, onClose }) => {
  return (
    <div className="product-view">
      <div className="product-view__header">
        <h2>Product Details</h2>
        <button className="product-view__close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <p>
        <strong>Name:</strong> {selectedProduct?.name}
      </p>
      <p>
        <strong>Category:</strong> {selectedProduct?.category}
      </p>
      <p>
        <strong>Status:</strong> {selectedProduct?.status}
      </p>
      <p>
        <strong>Unit:</strong> {selectedProduct?.unit}
      </p>
    </div>
  );
};

export default ProductView;
