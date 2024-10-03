import { gql } from "@apollo/client";

export const CREATE_RESOURCE = gql`
  mutation CreateResources($resourceInput: ResourceInput!) {
    createResource(input: { resourceInput: $resourceInput }) {
      resource {
        tenantId
        resourceCategory
        resourceStatus
        name
        capacity
        unit
        vehicleId
        id
      }
      errors
    }
  }
`;

export const UPDATE_RESOURCE = gql`
  mutation UpdateResource($resource: ResourceInput!) {
    updateResource(input: { resource: $resource }) {
      resource {
        tenantId
        resourceStatus
        resourceCategory
        unit
        name
        capacity
        vehicleId
      }
    }
  }
`;


export const DELETE_RESOURCE = gql`
  mutation DeleteResource($id: ID!) {
    deleteResource(id: $id) {
      success
      errors
    }
  }
`;
