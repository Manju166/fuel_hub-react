import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "react-modal";
import { useAddProduct } from "../hooks/useAddProduct";
import { useEditProduct } from "../hooks/useEditProduct";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { GET_PRODUCTS } from "../graphql/ProductQuery";
import ProductList from "../components/ProductList";
import ProductView from "../components/ProductView";
import ProductForm from "../components/ProductForm";
import "./style.css";
Modal.setAppElement("#root");

const Products = () => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "",
    unit: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAdd = useAddProduct(
    refetch,
    () => setIsModalOpen(false),
    setErrorMessage
  );
  const handleUpdate = useEditProduct(
    refetch,
    () => setIsModalOpen(false),
    setErrorMessage
  );
  const handleDelete = useDeleteProduct(refetch);

  const categoryOptions = [
    { value: "", label: "Select Category" },
    { value: "fuel", label: "Fuel" },
    { value: "lubricants", label: "Lubricants" },
    { value: "additives", label: "Additives" },
  ];
  const statusOptions = ["available", "out_of_stock", "discontinued"];
  const unitOptions = ["liters", "gallons"];

  const handleView = (product) => {
    setSelectedProduct(product);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      status: product.status,
      unit: product.unit,
      mode: "edit",
    });
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({ name: "", category: "", status: "", unit: "", mode: "add" });
    setModalMode("add");
    setIsModalOpen(true);
    setErrorMessage("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ name: "", category: "", status: "", unit: "", mode: "add" });
    setSelectedProduct(null);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    console.log("Form submitted", formData);
    if (formData.mode === "add") {
      handleAdd(formData);
    } else {
      handleUpdate(formData);
    }
  };

  const filteredProducts = selectedCategory
    ? data?.products?.products?.filter(
        (product) => product.category === selectedCategory
      )
    : data?.products?.products || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="products">
      <h1 className="products__title">Product List</h1>
      <div className="products__controls">
        <div className="products__category">
          <label className="products__label">Select Category:</label>
          <select
            name="productCategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="products__select"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button className="products__add-button" onClick={openAddModal}>
          Add Product
        </button>
      </div>

      <ProductList
        products={[...filteredProducts]}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCancel}
          contentLabel={
            modalMode === "view"
              ? "View Product"
              : modalMode === "edit"
              ? "Edit Product"
              : "Add Product"
          }
          className="products__modal"
        >
          <div className="products__modal-header">
            <h2 className="products__modal-title">
              {modalMode === "view"
                ? " "
                : modalMode === "edit"
                ? "Edit Product"
                : "Add Product"}
            </h2>
          </div>

          {modalMode === "view" ? (
            <ProductView
              selectedProduct={selectedProduct}
              onClose={() => setIsModalOpen(false)}
            />
          ) : (
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              categoryOptions={categoryOptions}
              statusOptions={statusOptions}
              unitOptions={unitOptions}
              handleSubmit={handleSubmit}
              errorMessage={errorMessage}
              handleCancel={handleCancel}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Products;
