import React from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEdit, FaTrash } from "react-icons/fa";

function OutletList({ outlets, handleEdit, handleDelete }) {
  const columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true, width:400 },
    { headerName: "Branch Address", field: "address", sortable: true, filter: true, width:400},
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
      ),width:220
    },
  ];

  return (
      <AgGridReact
        rowData={outlets}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        className="table ag-theme-alpine"
        style={{ width: "100%" }}
      />
  );
}

export default OutletList;
