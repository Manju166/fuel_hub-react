import React from "react";
import './style.css'
import { FaTimes } from "react-icons/fa";
const ConsumerView = ({ selectedConsumer, onClose }) => {
  return (
    <div className="consumer-view">
     <div className="consumer-view__header">
        <h2>Consumer Details</h2>
        <button className="consumer-view__close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <p><strong>ID:</strong> {selectedConsumer?.id}</p>
      <p><strong>Name:</strong> {selectedConsumer?.name}</p>
      <p><strong>Address:</strong> {selectedConsumer?.address}</p>
      <p><strong>Email:</strong> {selectedConsumer?.email}</p>
      <p><strong>Phone no. :</strong> {selectedConsumer?.phoneNumber}</p>
    </div>
  );
};

export default ConsumerView;
