// deleteResourceHandler.js
import { useMutation } from '@apollo/client';
import { DELETE_RESOURCE } from '../graphql/ResourceMutation';

export const useDeleteResource = () => {
  const [deleteResource, { loading, error }] = useMutation(DELETE_RESOURCE);

  const deleteResourceHandler = async (id) => {
    try {
      const { data } = await deleteResource({ variables: { id } });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return { deleteResourceHandler, loading, error };
};
