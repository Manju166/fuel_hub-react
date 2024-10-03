import { useMutation } from "@apollo/client";
import { DELETE_RESOURCE } from "../graphql/ResourceMutation";

export const useDeleteResource = (refetch) => {
  const [deleteResource] = useMutation(DELETE_RESOURCE);

  const handleDelete = async (resource) => {
    try {
      const { data } = await deleteResource({
        variables: { id: resource.id },
      });
      if (data.deleteResource.success) {
        refetch();
      } else {
        console.error(
          "Error deleting resource:",
          data.deleteResource.errors.join(", ")
        );
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  return handleDelete; // Return the handleDelete function
};
