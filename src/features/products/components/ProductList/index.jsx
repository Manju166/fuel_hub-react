// src/components/ProductList.js
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import './style.css'
const ProductList = ({ products, handleView, handleEdit, handleDelete }) => {
    const columnDefs = [
        {
          headerName: "Name",
          field: "name",
          sortable: true,
          filter: true,
          width: 250,
        },
        { headerName: "Category", field: "category", sortable: true, filter: true },
        { headerName: "Status", field: "status", sortable: true, filter: true,
            cellRenderer: (params) => (
                <span
                  className={
                    params.value === "available"
                      ? "product-status-available"
                      : params.value === "out_of_stock"
                      ? "product-status-out_of_stock"
                      : params.value === "discontinued"
                      ? "product-status-discontinued"
                      : "product-status-default"
                  }
                >
                  {params.value.charAt(0).toUpperCase() +
                    params.value.slice(1).replace(/_/g, " ")}
                </span>
              ),
         },
        { headerName: "Unit", field: "unit", sortable: true, filter: true },
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
    <div className="ag-theme-alpine table-container" style={{ width: "100%" }}>
      <AgGridReact
        rowData={products}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default ProductList;
