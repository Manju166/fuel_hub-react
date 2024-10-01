// src/components/ResourceList.js
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import './style.css'
const ResourceList = ({ resources, handleView, handleEdit, handleDelete }) => {
  const columnDefs = [
    {
      headerName: "Category",
      field: "resourceCategory",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "resourceStatus",
      sortable: true,
      filter: true,
      cellRenderer: (params) => (
        <span
          className={
            params.value === "available"
              ? "resource-status-available"
              : params.value === "unavailable"
              ? "resource-status-unavailable"
              : "resource-status-default"
          }
        >
          {params.value.charAt(0).toUpperCase() + params.value.slice(1).replace(/_/g, " ")}
        </span>
      ),
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="action-buttons">
          <button onClick={() => handleView(params.data)}>
            <FaEye />
          </button>
          <button onClick={() => handleEdit(params.data)}>
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(params.data)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine table-container">
      <AgGridReact
        rowData={resources}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50]}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default ResourceList;
