import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import REGISTER_MUTATION from "../graphql/registerMutation";
import { toast } from "react-toastify";

export const useRegisterHandler = (form) => {
  const [register, { loading: registerLoading, error: registerError }] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const { data } = await register({
        variables: {
          email: values.email,
          password: values.password,
          passwordConfirmation: values.passwordconfirm,
          tenantId: parseInt(values.tenant, 10),
        },
      });

      if (data?.createUser?.errors?.length > 0) {
        const emailError = data.createUser.errors.find(
          (error) => error.field === "email"
        );

        if (emailError) {
          form.setFields([
            {
              name: "email",
              errors: [emailError.message || "An error occurred during registration!"],
            },
          ]);
        } else {
          form.setFields([
            {
              name: "email",
              errors: ["Email is already taken!"],
            },
          ]);
        }
      } else if (data?.createUser?.user) {
        toast.success("Register successffully");
        navigate("/"); 
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } catch (e) {
      alert("A network or server error occurred. Please try again.");
    }
  };

  return {
    handleRegister,
    registerLoading,
    registerError,
  };
};
