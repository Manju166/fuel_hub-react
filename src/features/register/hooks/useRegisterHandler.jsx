import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import REGISTER_MUTATION from "../graphql/registerMutation";
import { toast } from "react-toastify";
import { APP_URL } from "../../../constants/APP_URL";

export const useRegisterHandler = (form) => {
  const [register, { loading: registerLoading }] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(null);
  const [generalError, setGeneralError] = useState(null);

  const handleRegister = async (values) => {
    setEmailError(null);
    setGeneralError(null); 

    try {
      const { data } = await register({
        variables: {
          email: values.email,
          password: values.password,
          passwordConfirmation: values.passwordconfirm,
          tenantId: parseInt(values.tenant, 10), 
        },
      });


      const backendErrors = data?.createUser?.errors; 
      if (backendErrors && backendErrors.length > 0) {
        const emailError = backendErrors.find((error) =>
          error.toLowerCase().includes("email")
        );

        if (emailError) {
          setEmailError(emailError);
          form.setFields([
            {
              name: "email",
              errors: [emailError],
            },
          ]);
        } else {
          toast.error("Registration failed. Please check your input.");
        }
      } else {
        toast.success("Registered successfully");
      navigate(APP_URL.LOGIN);
      }
    } catch (err) {
      console.error("Mutation error:", err);
    }
  };

  return {
    handleRegister,
    registerLoading,
    emailError,
    generalError,
  };
};
