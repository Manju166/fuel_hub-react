import { useMutation } from "@apollo/client";
import { UPDATE_RESOURCE } from "../graphql/ResourceMutation";

export const useEditResource = (refetch, setIsModalOpen, setErrorMessage) => {
    const [updateResource] = useMutation(UPDATE_RESOURCE);
  
    const handleUpdate = async (selectedResource, formData) => {
      if (!formData.resourceCategory.trim() || !formData.resourceStatus.trim()) {
        setErrorMessage("All fields are required.");
        return;
      }
  
      try {
        const { data } = await updateResource({
          variables: { resource: { id: selectedResource.id, ...formData } },
        });
        if (data.updateResource.resource) {
          refetch();
          setIsModalOpen(false);
          setErrorMessage("");
        } else {
          setErrorMessage(data.updateResource.errors.join(", "));
        }
      } catch (error) {
        console.error("Error updating resource:", error);
        setErrorMessage("An error occurred while updating the resource.");
      }
    };
  
    return handleUpdate;
  };
  