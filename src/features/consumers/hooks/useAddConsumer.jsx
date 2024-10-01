import { useMutation } from "@apollo/client";
import { CREATE_CONSUMER } from "../graphql/ConsumerMutation";
import { toast } from "react-toastify";
import { useState } from "react";

export const useAddConsumer = (refetch, setIsModalOpen, setErrorMessages, form) => {
  const [createConsumer] = useMutation(CREATE_CONSUMER);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const handleAdd = async (formData) => {
    setEmailError(null);
    setPhoneError(null);
    let errors = {};

    // Frontend validation
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

    // If frontend errors, set the error messages and return early
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

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

      // Check if there are any backend errors
      const backendErrors = data?.createConsumer?.errors;
      if (backendErrors && backendErrors.length > 0) {
        const emailError = backendErrors.find((error) =>
          error.toLowerCase().includes("email")
        );
        const phoneError = backendErrors.find((error) =>
          error.toLowerCase().includes("phone number")
        );

        // Display backend validation errors
        if (form) { // Check if form is defined
          if (emailError) {
            setEmailError(emailError);
            form.setFields([
              {
                name: "email",
                errors: [emailError],
              },
            ]);
          }
          if (phoneError) {
            setPhoneError(phoneError);
            form.setFields([
              {
                name: "phoneNumber",
                errors: [phoneError],
              },
            ]);
          }
        } else {
          toast.error("Failed! to add consumer List");
        }
      } else {
        refetch();
        setIsModalOpen(false);
        setErrorMessages({});
        toast.success("Consumer created successfully!");
      }
    } catch (error) {
      console.error("Error adding consumer:", error);
      setErrorMessages({
        general: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return handleAdd;
};
