// src/components/ProductView.js
import React from "react";

const ProductView = ({ selectedProduct }) => {
  return (
    <div>
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
