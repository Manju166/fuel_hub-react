import React from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './style.css'


const ResourceList = ({ data, handleView, handleEdit, handleDelete, openAddModal }) => {
  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
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
      width: 135,
      cellRenderer: (params) => (
        <span
          className={
            params.value === "available"
              ? "resource-status-available"
              : "resource-status-unavailable"
          }
        >
          {params.value}
        </span>
      ),
    },
    { headerName: "Capacity", field: "capacity", sortable: true, filter: true,width:120 },
    { headerName: "Unit", field: "unit", sortable: true, filter: true ,width:110},
    { headerName: "Vehicle ID", field: "vehicleId", sortable: true, filter: true,width:140 },
    {
      headerName: "Actions",
      field: "actions",
      width:160,
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
    },
  ];

  return (
    
      <div className="ag-theme-alpine table-container" style={{ width: "100%" }}>
        <AgGridReact
          rowData={data?.getResources?.resources}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
  );
};

export default ResourceList;
