import React from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import './style.css'

const ResourceList = ({ resources, handleView, handleEdit, handleDelete }) => {
  const columnDefs = [
      { headerName: 'Name', field: 'name', filter: true, width:160 },
    { headerName: 'Category', field: 'resourceCategory',filter: true, width:190 },
    { headerName: 'Vehicle ID', field: 'vehicleId', filter: true, width:160  },
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
    { headerName: 'Capacity', field: 'capacity',filter: true, width:110 },
    { headerName: 'Unit', field: 'unit', filter: true, width:100 },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="table__actions">
          <button className="table__action-button table__action-button--view" onClick={() => handleView(params.data)}>
            <FaEye />
          </button>
          <button className="table__action-button table__action-button--edit" onClick={() => handleEdit(params.data)}>
            <FaEdit />
          </button>
          <button className="table__action-button table__action-button--delete" onClick={() => handleDelete(params.data)}>
            <FaTrash />
          </button>
        </div>
      ),
      width: 140
    },
  ];

  return (
    <div className="ag-theme-alpine table-container" style={{ width: '100%' }}>
      <AgGridReact
        rowData={resources}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default ResourceList;
