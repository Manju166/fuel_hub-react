import React from "react";
import ReusableForm from "../../../../components/FormWrapper/ReusableForm";

const ConsumerForm = ({
  formData,
  setFormData,
  handleAdd,
  handleUpdate,
  selectedConsumer,
  modalMode,
  setIsModalOpen,
  emailError,
  phoneError,
}) => {
  const onFinish = (values) => {
    if (modalMode === "add") {
      handleAdd(values);
    } else {
      handleUpdate(selectedConsumer, values);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      rules: [{ required: true, message: "Please enter the name" }],
    },
    {
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Please enter the email" },
        { type: "email", message: "Please enter a valid email" },
      ],
      error: emailError, 
    },
    {
      name: "address",
      label: "Address",
      rules: [{ required: true, message: "Please enter the address" }],
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      rules: [
        { required: true, message: "Please enter the phone number" },
        {
          pattern: /^\d{10}$/,
          message: "Phone number must be exactly 10 digits",
        },
      ],
      error: phoneError, 
    },
  ];

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
};

export default ConsumerForm;
