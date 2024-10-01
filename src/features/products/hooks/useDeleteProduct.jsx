import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../graphql/ProductMutation";
import { toast } from "react-toastify";

export const useDeleteProduct = (refetch) => {
    const [deleteProduct] = useMutation(DELETE_PRODUCT);
  
    const handleDelete = async (product) => {
      try {
        const { data } = await deleteProduct({ variables: { id: product.id } });
        if (data.deleteProduct.product) {
          refetch();
          toast.success("Product Deleted")
        } else {
          console.error(
            "Error deleting product:",
            data.deleteProduct.errors.join(", ")
          );
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };
    return handleDelete;
  };