import React from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { GET_ALL_ORDERS } from '../../graphql/OrderQuery';

const OrderList = () => {
  const { loading, error, data } = useQuery(GET_ALL_ORDERS);

  const columnDefs = [
    { headerName: "Order ID", field: "id" },
    { headerName: "Status", field: "status" },
    { headerName: "Tenant ID", field: "tenantId" },
    { headerName: "Consumer Name", field: "consumer.name" },
    { headerName: "Consumer Email", field: "consumer.email" },
    { headerName: "Consumer Phone", field: "consumer.phoneNumber" },
    { headerName: "Frequency", field: "frequency" },
    { headerName: "Recurring", field: "recurring" },
    { headerName: "Delivery Outlet", field: "deliveryOrder.consumerOutlet.name" },
    { headerName: "Planned At", field: "deliveryOrder.plannedAt" },
    { headerName: "Completed At", field: "deliveryOrder.completedAt" },
    { headerName: "Line Item Quantity", field: "deliveryOrder.lineItems[0].quantity" },
    { headerName: "Product Name", field: "deliveryOrder.lineItems[0].product.name" } 
  ];

  const rowData = data?.getAllOrders?.orderGroups || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

 
  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
        domLayout='autoHeight'
      />
    </div>
  );
};

export default OrderList;
