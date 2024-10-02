// editResourceHandler.js
import { useMutation } from '@apollo/client';
import { UPDATE_RESOURCE } from '../graphql/ResourceMutation';

export const useEditResource = () => {
  const [updateResource, { loading, error }] = useMutation(UPDATE_RESOURCE);

  const editResourceHandler = async (resource) => {
    try {
      const { data } = await updateResource({ variables: { resource } });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return { editResourceHandler, loading, error };
};
