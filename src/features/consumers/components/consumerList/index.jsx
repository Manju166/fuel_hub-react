import React from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './style.css'

const ConsumerList = ({ data, handleView, handleEdit, handleDelete, handleShowBranches }) => {
  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true, width: 205 },
    { headerName: "Address", field: "address", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true, width: 210 },
    { headerName: "Phone no.", field: "phoneNumber", sortable: true, filter: true, width: 130 },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="action-buttons">
          <button onClick={() => handleView(params.data)}><FaEye /></button>
          <button onClick={() => handleEdit(params.data)}><FaEdit /></button>
          <button onClick={() => handleDelete(params.data)}><FaTrash /></button>
        </div>
      ),
      width: 175,
    },
    {
      headerName: "Branch Detail",
      field: "branch",
      cellRenderer: (params) => (
        <button onClick={() => handleShowBranches(params.data.id)} className="show-branch-button">Show</button>
      ),
      width: 130,
    },
  ];

  return (
    <div className="ag-theme-alpine table-container" style={{ width: "100%" }}>
      <AgGridReact rowData={data.consumers} columnDefs={columnDefs} pagination={true} paginationPageSize={10} />
    </div>
  );
};

export default ConsumerList;
