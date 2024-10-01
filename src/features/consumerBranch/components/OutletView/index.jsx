import React from "react";
import './style.css'
function OutletView({ selectedBranch }) {
  return (
    <div>
      <p><strong>Consumer Outlet ID:</strong> {selectedBranch?.id}</p>
      <p><strong>Consumer ID:</strong> {selectedBranch?.consumerId}</p>
      <p><strong>Name:</strong> {selectedBranch?.name}</p>
      <p><strong>Branch Address:</strong> {selectedBranch?.address}</p>
    </div>
  );
}

export default OutletView;
