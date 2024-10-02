import { useMutation } from "@apollo/client";
import { UPDATE_OUTLET } from "../graphql/ConsumerBranchMutation";

export const useEditOutlet = (refetch, setIsModalOpen, setErrorMessage) => {
  const [updateOutlet] = useMutation(UPDATE_OUTLET);

  const handleUpdate = async (formData) => {
    try {
      const { data } = await updateOutlet({
        variables: {
          outletDetails: {
            id: formData.id,
            name: formData.name,
            address: formData.address,
            consumerId: formData.consumerId,
          },
        },
      });
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage("Failed to update outlet.");
    }
  };

  return handleUpdate;
};
