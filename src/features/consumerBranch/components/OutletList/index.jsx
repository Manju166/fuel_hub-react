import React from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import './style.css'
function OutletList({ outlets, handleView, handleEdit, handleDelete }) {
  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true, width: 70 },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Branch Address", field: "address", sortable: true, filter: true },
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
      width:300
    },
  ];

  return (
    <div className="ag-theme-alpine table-container">
      <AgGridReact
        rowData={outlets}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        className="table"
      />
    </div>
  );
}

export default OutletList;
