// src/hooks/ResourceHandler.js
import { useMutation } from "@apollo/client";
import { CREATE_RESOURCE } from "../graphql/ResourceMutation";

export const useAddResource = (refetch, setIsModalOpen, setErrorMessage) => {
  const [createResource] = useMutation(CREATE_RESOURCE);

  const handleAdd = async (formData) => {
    if (!formData.resourceCategory.trim() || !formData.resourceStatus.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const { data } = await createResource({
        variables: { resourceInput: formData },
      });
      if (data.createResource.resource) {
        refetch();
        setIsModalOpen(false);
        setErrorMessage("");
      } else {
        setErrorMessage(data.createResource.errors.join(", "));
      }
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  return handleAdd;
};



