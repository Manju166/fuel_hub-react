import React from "react";
import { Form, Input, Select } from "antd";
import "./style.css";
import Button from "../Button/Button";

const ReusableForm = ({
  formData,
  setFormData,
  fields,
  onFinish,
  modalMode,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm();

  return (
    <div className="form-container">
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={formData}>
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={field.rules}
            validateStatus={field.error ? "error" : ""}
            help={field.error}
            required={field.required || false}
          >
            {field.type === "select" ? (
              <Select
                value={formData[field.name]}
                onChange={(value) => setFormData({ ...formData, [field.name]: value })}
                placeholder={field.placeholder || "Select an option"}
              >
                {field.options.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input
                value={formData[field.name]}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              />
            )}
          </Form.Item>
        ))}

        <Form.Item>
          <div className="form-container__footer">
            <Button
              type="submit"
              className="button--primary"
              label={modalMode === "add" ? "Add" : "Update"}
            />
            <Button
              type="button"
              className="button--cancel"
              label="Cancel"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReusableForm;
