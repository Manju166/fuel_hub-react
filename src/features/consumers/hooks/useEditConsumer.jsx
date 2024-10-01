import { useMutation } from "@apollo/client";
import { UPDATE_CONSUMER } from "../graphql/ConsumerMutation";
import { toast } from "react-toastify";

export const useEditConsumer = (refetch, setIsModalOpen, setErrorMessage) => {
    const [updateConsumer] = useMutation(UPDATE_CONSUMER);
  
    const handleUpdate = async (selectedConsumer, formData) => {
      const { id } = selectedConsumer;
      if (!formData.name.trim() || !formData.address.trim()) {
        setErrorMessage("Name and Address cannot be empty.");
        return;
      }
  
      try {
        const { data } = await updateConsumer({
          variables: {
            id,
            consumerDetails: {
              name: formData.name,
              address: formData.address,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
            },
          },
        });
  
        const backendErrors = data?.updateConsumer?.errors;
      if (backendErrors && backendErrors.length > 0) {
        const emailError = backendErrors.find((error) =>
          error.toLowerCase().includes("email")
        );
        const phoneNumberError = backendErrors.find((error) =>
          error.toLowerCase().includes("phone")
        );

        if (emailError || phoneNumberError) {
          setErrorMessage({
            email: emailError || null,
            phoneNumber: phoneNumberError || null,
          });
        } else {
          toast.error("Failed to update consumer. Please check your input.");
        }
      } else {
        toast.success("Consumer updated successfully!");
        setIsModalOpen(false);
        refetch();
      }
    } catch (err) {
      console.error("Error updating consumer:", err);
    }
  };

  
    return handleUpdate;
  };
  