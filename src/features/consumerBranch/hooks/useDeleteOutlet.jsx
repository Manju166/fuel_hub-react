import { useMutation } from "@apollo/client";
import { DELETE_OUTLET } from "../graphql/ConsumerBranchMutation";

export const useDeleteOutlet = (refetch) => {
  const [deleteOutlet] = useMutation(DELETE_OUTLET);

  const handleDelete = async (outlet) => {
    try {
      await deleteOutlet({ variables: { id: outlet.id } });
      refetch();
    } catch (err) {
      console.error("Error deleting outlet:", err);
    }
  };

  return handleDelete;
};
