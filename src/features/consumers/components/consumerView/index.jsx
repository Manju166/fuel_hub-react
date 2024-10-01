import React from "react";
import './style.css'
const ConsumerView = ({ selectedConsumer }) => {
  return (
    <div className="consumer-view">
      <p><strong>ID:</strong> {selectedConsumer?.id}</p>
      <p><strong>Name:</strong> {selectedConsumer?.name}</p>
      <p><strong>Address:</strong> {selectedConsumer?.address}</p>
      <p><strong>Email:</strong> {selectedConsumer?.email}</p>
      <p><strong>Phone no. :</strong> {selectedConsumer?.phoneNumber}</p>
    </div>
  );
};

export default ConsumerView;
