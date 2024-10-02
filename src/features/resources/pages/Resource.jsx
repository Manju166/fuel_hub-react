// src/components/Resource.js
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "react-modal";
import { GET_RESOURCES } from "../graphql/ResourceQuery";
import { useAddResource } from "../hooks/useAddResource";
import { useEditResource } from "../hooks/useEditResource";
import { useDeleteResource } from "../hooks/useDeleteResource";
import './style.css'
import ResourceList from "../components/ResourceList";
import ResourceView from "../components/ResourceView";
import ResourceForm from "../components/ResourceForm";
Modal.setAppElement("#root");

function Resource() {
  const { loading, error, data, refetch } = useQuery(GET_RESOURCES);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedResource, setSelectedResource] = useState(null);
  const [formData, setFormData] = useState({
    resourceStatus: "",
    resourceCategory: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Use the handlers from hooks
  const handleAdd = useAddResource(refetch, setIsModalOpen, setErrorMessage);
  const handleUpdate = useEditResource(refetch, setIsModalOpen, setErrorMessage);
  const handleDelete = useDeleteResource(refetch);

  const openAddModal = () => {
    setFormData({ resourceStatus: "", resourceCategory: "" });
    setModalMode("add");
    setIsModalOpen(true);
    setErrorMessage("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: There was an error fetching the data.</p>;

  return (
    <>
      <h1>Resource List</h1>
      <button className="table-container__add-resource-btn" onClick={openAddModal}>
        Add Resource
      </button>
      <ResourceList
        resources={data?.getResources?.resources}
        handleView={setSelectedResource}
        handleEdit={setSelectedResource}
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
            <h2>{modalMode === "view" ? "View Resource" : modalMode === "edit" ? "Edit Resource" : "Add Resource"}</h2>
          </div>
          {modalMode === "view" ? (
            <ResourceView selectedResource={selectedResource} />
          ) : (
            <ResourceForm
              formData={formData}
              setFormData={setFormData}
              handleAdd={handleAdd}
              handleUpdate={handleUpdate}
              modalMode={modalMode}
              selectedResource={selectedResource}
            />
          )}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </Modal>
      )}
    </>
  );
}

export default Resource;
