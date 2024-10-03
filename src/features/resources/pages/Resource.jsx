import React, { useState } from "react";
import Modal from "react-modal";
import './style.css';
import { GET_RESOURCES } from "../graphql/ResourceQuery";
import { useEditResource } from "../hooks/useEditResource";
import { useDeleteResource } from "../hooks/useDeleteResource";
import { useAddResource } from "../hooks/useAddResource";
import { useQuery } from "@apollo/client";
import ResourceView from "../components/ResourceView";
import ResourceForm from "../components/ResourceForm";
import ResourceList from "../components/ResourceList";
import Button from "../../../components/Button/Button";

Modal.setAppElement("#root");

const Resource = () => {
  const { loading, error, data, refetch } = useQuery(GET_RESOURCES);
  
  // State management for modal, form data, and error messages
  const [modalMode, setModalMode] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    resourceCategory: "",
    resourceStatus: "",
    capacity: null,
    unit: "",
    vehicleId: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const categoryOptions = ["tanker_truck", "rails_tank", "tank_wagon", "tanker_LNG", "bitumen_truck"];
  const statusOptions = ["available", "unavailable"];
  const unitOptions = ["liters", "gallons"];

  const handleAdd = useAddResource(refetch);
  const handleUpdate = useEditResource(refetch, () => setIsModalOpen(false), setErrorMessage);
  const handleDelete = useDeleteResource(refetch);

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      name: "",
      resourceCategory: "",
      resourceStatus: "",
      capacity: null,
      unit: "",
      vehicleId: "",
    });
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const handleView = (resource) => {
    setSelectedResource(resource);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = (resource) => {
    setSelectedResource(resource);
    setFormData({ ...resource });
    setModalMode("edit");
    setErrorMessage("");
    setIsModalOpen(true);
  };

const handleSubmit = (formData) => {
  if (modalMode === "add") {
    handleAdd(formData, setErrorMessage, () => setIsModalOpen(false));
  } else if (modalMode === "edit") {
    handleUpdate(selectedResource, formData, setErrorMessage, () => setIsModalOpen(false));
  }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    <h1>Resource List</h1>
      <div className="resource">
      <Button className="add--button" onClick={openAddModal} label="Add Resource"/>
      </div>
      <ResourceList
        data={data}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel={modalMode === "view" ? "View Resource" : modalMode === "edit" ? "Edit Resource" : "Add Resource"}
          className="resource-modal"
        >
          <div className="modal-header">
            <h2>{modalMode === "view" ? "" : modalMode === "edit" ? "Edit Resource" : "Add Resource"}</h2>
          </div>
          {modalMode === "view" ? (
            <ResourceView selectedResource={selectedResource}  onClose={() => setIsModalOpen(false)}/>
          ) : (
            <ResourceForm
              formData={formData}
              setFormData={setFormData}
              handleAdd={handleAdd}
              handleUpdate={handleUpdate}
              selectedResource={selectedResource}
              modalMode={modalMode}
              setIsModalOpen={setIsModalOpen}
              errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            categoryOptions={categoryOptions}
            statusOptions={statusOptions}
            unitOptions={unitOptions}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Resource;
