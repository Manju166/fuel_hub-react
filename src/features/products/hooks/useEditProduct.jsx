import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../graphql/ProductMutation";

export const useEditProduct = (refetch, setIsModalOpen, setErrorMessage) => {
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const handleUpdate = async (formData) => {
    console.log("formData",formData)
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
            id: formData.id,
            name: formData.name,
            category: formData.category,
            status: formData.status,
            unit: formData.unit,
          },
        },
      });
if (data.updateProduct.product) {
  console.log("Product updated:", data.updateProduct.product);
  refetch(); 
  setIsModalOpen(false);
  setErrorMessage("");
}
 else {
        setErrorMessage(data.updateProduct.errors.join(", "));
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage("An error occurred while updating the product.");
    }
  };
  return handleUpdate;
};

