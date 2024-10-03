import { useMutation } from "@apollo/client";
import { CREATE_CONSUMER } from "../graphql/ConsumerMutation";
import { toast } from "react-toastify";
import { useState } from "react";

export const useAddConsumer = (refetch, setIsModalOpen, setErrorMessages) => {
  const [createConsumer] = useMutation(CREATE_CONSUMER);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const handleAdd = async (formData) => {
    setEmailError(null);
    setPhoneError(null);
    let errors = {};

    // Basic form validation
    if (!formData.name.trim()) {
      errors.name = "Name cannot be empty.";
    }
    if (!formData.address.trim()) {
      errors.address = "Address cannot be empty.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address.";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number cannot be empty.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    // GraphQL mutation
    try {
      const { data } = await createConsumer({
        variables: {
          consumerDetails: {
            name: formData.name,
            address: formData.address,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          },
        },
      });

      if (data.createConsumer.consumer) {
        refetch();
        setIsModalOpen(false);
        setErrorMessages("");
      } else {
        console.error("Error adding consumer:", data.createConsumer.errors);
      }
    } catch (error) {
      // Process server validation errors
      const errorMessage = error.message || "Error adding consumer";
      
      if (errorMessage.includes("Email has already taken")) {
        setEmailError("Email has already been taken.");
      }
      if (errorMessage.includes("Phone number already used")) {
        setPhoneError("Phone number has already been used.");
      }
      
      console.error("Error adding consumer:", error);
    }
  };

  return handleAdd;
};


