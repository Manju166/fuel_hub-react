import { useMutation } from "@apollo/client";
import { CREATE_RESOURCE } from "../graphql/ResourceMutation";

export const useAddResource = (refetch) => {
  const [createResource] = useMutation(CREATE_RESOURCE);

  const handleAdd = async (formData, setErrorMessage, setIsModalOpen) => {
    if (!formData.name || !formData.capacity ||!formData.resourceCategory || !formData.resourceStatus || !formData.unit ||!formData.vehicleId) {
      setErrorMessage("All fields are required");
      return;
    }
    try {
      const formattedFormData = { ...formData, capacity: parseInt(formData.capacity, 10) };
      const { data } = await createResource({ variables: { resourceInput: formattedFormData } });
      if (data.createResource.resource) {
        refetch();
        setIsModalOpen(false);
      } else {
        setErrorMessage(data.createResource.errors.join(", "));
      }
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  return handleAdd;
};
