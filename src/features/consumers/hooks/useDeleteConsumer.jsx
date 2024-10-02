import { useMutation } from "@apollo/client";
import { DELETE_CONSUMER } from "../graphql/ConsumerMutation";

export const useDeleteConsumer = (refetch) => {
    const [deleteConsumer] = useMutation(DELETE_CONSUMER);
  
    const handleDelete = async (consumer) => {
      const { id } = consumer;
      try {
        const { data } = await deleteConsumer({ variables: { input: { id } } });
  
        if (data.deleteConsumer.success) {
          refetch(); 
          console.log("Consumer deleted:", data.deleteConsumer.success);
        } else {
          console.error("Error deleting consumer:", data.deleteConsumer.errors);
        }
      } catch (error) {
        console.error("Error deleting consumer:", error);
      }
    };
  
    return handleDelete;
  };
  