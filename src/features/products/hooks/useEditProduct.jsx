import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../graphql/ProductMutation";
import { toast } from "react-toastify";

export const useEditProduct = (refetch, setIsModalOpen, setErrorMessage) => {
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
  
    const handleUpdate = async (selectedProduct, formData) => {
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
        const { data } = await updateProduct({
          variables: {
            productDetails: {
              id: selectedProduct.id,
              ...formData,
            },
          },
        });
  
        if (data.updateProduct.product) {
          refetch();
          toast.success("Product Updated successfully")
          setIsModalOpen(false);
          setErrorMessage("");
        } else {
          setErrorMessage(data.updateProduct.errors.join(", "));
        }
      } catch (error) {
        console.error("Error updating product:", error);
        setErrorMessage("An error occurred while updating the product.");
      }
    };
  
    return handleUpdate;
  };