import { useMutation } from "@apollo/client";
import { UPDATE_RESOURCE } from "../graphql/ResourceMutation";

export const useEditResource = (refetch) => {
  const [updateResource] = useMutation(UPDATE_RESOURCE);

  const handleUpdate = async (selectedResource, formData, setErrorMessage, setIsModalOpen) => {
    try {
      // Filter out unnecessary fields
      const formattedFormData = {
        name: formData.name,
        resourceCategory: formData.resourceCategory,
        resourceStatus: formData.resourceStatus,
        capacity: parseInt(formData.capacity, 10), // Ensure capacity is an integer
        unit: formData.unit,
        vehicleId: formData.vehicleId,
      };

      // Call updateResource with only the necessary fields
      const { data } = await updateResource({
        variables: {
          resource: {
            id: selectedResource.id, // Make sure the selectedResource has an id
            ...formattedFormData,
          },
        },
      });

      if (data.updateResource.resource) {
        refetch();
        setIsModalOpen(false);
      } else {
        setErrorMessage(data.updateResource.errors.join(", "));
      }
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  };

  return handleUpdate;
};
