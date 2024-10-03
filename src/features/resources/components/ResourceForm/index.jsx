import React from "react";
import { Form, Select, Input, Button } from "antd";
import "./style.css";

const ResourceForm = ({
  formData,
  setFormData,
  modalMode,
  handleSubmit,
  categoryOptions,
  statusOptions,
  unitOptions,
  errorMessage,
  setIsModalOpen,
}) => {
  const { Option } = Select;

  const handleAdd = () => {
    handleSubmit(formData); // Submit the form for adding a resource
  };

  const handleUpdate = () => {
    handleSubmit(formData); // Submit the form for updating a resource
  };

  return (
    <Form className="resource-form">
      <Form.Item
        label="Name"
        validateStatus={errorMessage && errorMessage.name ? "error" : ""}
        help={errorMessage && errorMessage.name}
      >
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter name"
        />
      </Form.Item>
      <Form.Item
        label="Status"
        validateStatus={
          errorMessage && errorMessage.resourceStatus ? "error" : ""
        }
        help={errorMessage && errorMessage.resourceStatus}
      >
        <Select
          value={formData.resourceStatus}
          onChange={(value) =>
            setFormData({ ...formData, resourceStatus: value })
          }
          placeholder="Select Status"
        >
          {statusOptions.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Category"
        validateStatus={
          errorMessage && errorMessage.resourceCategory ? "error" : ""
        }
        help={errorMessage && errorMessage.resourceCategory}
      >
        <Select
          value={formData.resourceCategory}
          onChange={(value) =>
            setFormData({ ...formData, resourceCategory: value })
          }
          placeholder="Select Category"
        >
          {categoryOptions.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Unit"
        validateStatus={errorMessage && errorMessage.unit ? "error" : ""}
        help={errorMessage && errorMessage.unit}
      >
        <Select
          value={formData.unit}
          onChange={(value) => setFormData({ ...formData, unit: value })}
          placeholder="Select Unit"
        >
          {unitOptions.map((unit) => (
            <Option key={unit} value={unit}>
              {unit}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Capacity"
        validateStatus={errorMessage && errorMessage.capacity ? "error" : ""}
        help={errorMessage && errorMessage.capacity}
      >
        <Input
          type="number"
          value={formData.capacity || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              capacity: e.target.value ? parseInt(e.target.value, 10) : null,
            })
          }
          placeholder="Enter capacity"
        />
      </Form.Item>
      <Form.Item
        label="Vehicle ID"
        validateStatus={errorMessage && errorMessage.vehicleId ? "error" : ""}
        help={errorMessage && errorMessage.vehicleId}
      >
        <Input
          value={formData.vehicleId}
          onChange={(e) =>
            setFormData({ ...formData, vehicleId: e.target.value })
          }
          placeholder="Enter vehicle ID"
        />
      </Form.Item>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="modal-footer">
        {modalMode === "add" ? (
          <Button
            type="primary"
            className="button--primary"
            onClick={handleAdd}
          >
            Add
          </Button>
        ) : (
          <Button
            type="primary"
            className="button--primary"
            onClick={handleUpdate}
          >
            Update
          </Button>
        )}
        <Button
          type="default"
          className="button--cancel"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default ResourceForm;
