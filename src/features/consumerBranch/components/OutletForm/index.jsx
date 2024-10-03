import React from "react";
import ReusableForm from "../../../../components/FormWrapper/ReusableForm";

function OutletForm({ formData, setFormData, consumerId, handleAdd, handleUpdate, modalMode, setIsModalOpen }) {
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name",
      required: false,
      rules: [{ required: true, message: "Please enter the name" }],
    },
    {
      name: "address",
      label: "Branch Address",
      type: "text",
      placeholder: "Enter branch address",
      required: false,
      rules: [{ required: true, message: "Please enter the branch address" }],
    },
  ];

  const onFinish = () => {
    if (modalMode === "add") {
      handleAdd(formData, consumerId);
    } else {
      handleUpdate(formData, consumerId);
    }
  };

  return (
    <ReusableForm
      formData={formData}
      setFormData={setFormData}
      fields={fields}
      onFinish={onFinish}
      modalMode={modalMode}
      setIsModalOpen={setIsModalOpen}
    />
  );
}

export default OutletForm;
