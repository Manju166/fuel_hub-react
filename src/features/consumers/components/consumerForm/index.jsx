import React from "react";
import { Form, Input } from "antd";
import "./style.css";

const ConsumerForm = ({
  formData,
  setFormData,
  handleAdd,
  handleUpdate,
  selectedConsumer,
  modalMode,
  setIsModalOpen,
  handlePhoneNumberChange,
  emailError,
  phoneError,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (modalMode === "add") {
      handleAdd(values);
    } else {
      handleUpdate(selectedConsumer, values);
    }
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={formData}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
          required={false}
        >
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
          required={false}
          validateStatus={emailError ? "error" : ""}
          help={emailError}
        >
          <Input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter the address" }]}
          required={false}
        >
          <Input
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter the phone number" },
            {
              pattern: /^\d{10}$/,
              message: "Phone number must be exactly 10 digits",
            },
          ]}
          required={false}
          validateStatus={phoneError ? "error" : ""}
          help={phoneError}
        >
          <Input
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </Form.Item>

        <Form.Item>
          <div className="form-container__footer">
            <button
              type="submit"
              className="form-container__button form-container__button--primary"
            >
              {modalMode === "add" ? "Add" : "Update"}
            </button>
            <button
              type="button"
              className="form-container__button form-container__button--cancel"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ConsumerForm;
