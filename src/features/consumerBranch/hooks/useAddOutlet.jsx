import { useMutation } from "@apollo/client";
import { CREATE_OUTLET } from "../graphql/ConsumerBranchMutation";

export const useAddOutlet = (refetch, setIsModalOpen, setErrorMessage) => {
  const [createOutlet] = useMutation(CREATE_OUTLET);

  const handleAdd = async (formData, consumerId) => {
    const { name, address } = formData;

    if (!name.trim() || !address.trim()) {
      setErrorMessage("Name and Address cannot be empty.");
      return;
    }

    try {
      const { data } = await createOutlet({
        variables: { outletDetails: { name, address, consumerId } },
      });

      if (data.createOutlet.outlet) {
        refetch();
        setIsModalOpen(false);
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to add outlet.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the outlet.");
    }
  };

  return handleAdd;
};
