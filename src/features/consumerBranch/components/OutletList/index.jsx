import React from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import './style.css';

function OutletList({ outlets, handleEdit, handleDelete }) {
  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true, width: 250 },
    { headerName: "Branch Address", field: "address", sortable: true, filter: true, width: 250 },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="table__actions">
          <button className="table__action-button table__action-button--edit" onClick={() => handleEdit(params.data)}>
            <FaEdit />
          </button>
          <button className="table__action-button table__action-button--delete" onClick={() => handleDelete(params.data)}>
            <FaTrash />
          </button>
        </div>
      ),
      width: 210,
    },
  ];

  return (
    <div className="table-container ag-theme-alpine">
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
