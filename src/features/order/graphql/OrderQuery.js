import { gql } from '@apollo/client';

export const GET_ALL_ORDERS = gql`
  query getAllOrder {
    getAllOrders {
      orderGroups {
        id
        status
        tenantId
        consumer {
          id
          name
          email
          phoneNumber
        }
        frequency
        recurring
        deliveryOrder {
          id
          consumerOutlet {
            id
            name
            address
          }
          plannedAt
          completedAt
          lineItems {
            id
            status
            quantity
            product {
              id
              name
              status
              category
              unit
            }
          }
        }
      }
      errors
    }
  }
`;
