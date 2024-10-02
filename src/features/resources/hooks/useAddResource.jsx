// addResourceHandler.js
import { useMutation } from '@apollo/client';
import { CREATE_RESOURCE } from '../graphql/ResourceMutation';

export const useAddResource = () => {
  const [createResource, { loading, error }] = useMutation(CREATE_RESOURCE);

  const addResourceHandler = async (resourceInput) => {
    try {
      const { data } = await createResource({ variables: { resourceInput } });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return { addResourceHandler, loading, error };
};
