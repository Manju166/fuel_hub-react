import React from "react";
import ReusableForm from "../../../../components/FormWrapper/ReusableForm"; 
const ProductForm = ({
  formData,
  setFormData,
  categoryOptions,
  statusOptions,
  unitOptions,
  handleSubmit,
  errorMessage,
  handleCancel,
}) => {
  const fields = [
    {
      name: "name",
      label: "Name",
      rules: [{ required: true, message: "Please enter the product name" }],
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categoryOptions,
      rules: [{ required: true, message: "Please select a category" }],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: statusOptions.map(status => ({ value: status, label: status })),
      rules: [{ required: true, message: "Please select a status" }],
    },
    {
      name: "unit",
      label: "Unit",
      type: "select",
      options: unitOptions.map(unit => ({ value: unit, label: unit })),
      rules: [{ required: true, message: "Please select a unit" }],
    },
  ];

  const onFinish = () => {
    handleSubmit();
  };

  return (
    <div>
      {errorMessage && <p className="product-form__error-message">{errorMessage}</p>}
      <ReusableForm
        formData={formData}
        setFormData={setFormData}
        fields={fields}
        onFinish={onFinish}
        modalMode={formData.mode}
        setIsModalOpen={handleCancel}
      />
    </div>
  );
};

export default ProductForm;
