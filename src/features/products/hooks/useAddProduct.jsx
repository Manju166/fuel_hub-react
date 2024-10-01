import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../graphql/ProductMutation";
import { toast } from "react-toastify";

export const useAddProduct = (refetch, setIsModalOpen, setErrorMessage) => {
    const [createProduct] = useMutation(CREATE_PRODUCT);
  
    const handleAdd = async (formData) => {
      if (
        !formData.name.trim() ||
        !formData.category.trim() ||
        !formData.status.trim() ||
        !formData.unit.trim()
      ) {
        setErrorMessage("All fields are required.");
        return;
      }
  
      try {
        const { data } = await createProduct({
          variables: { productDetails: formData },
        });
        if (data.createProduct.product) {
          refetch();
          toast.success("Product added successfully")
          setIsModalOpen(false);
          setErrorMessage("");
        } else {
          setErrorMessage(data.createProduct.errors.join(", "));
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };
    return handleAdd;
  };