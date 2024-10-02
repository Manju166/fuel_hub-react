import React, { useState } from "react";
import Modal from "react-modal";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_CONSUMERS } from "../graphql/ConsumerQuery";
import ConsumerForm from "../components/ConsumerForm";
import ConsumerView from "../components/ConsumerView";
import ConsumerList from "../components/ConsumerList";
import {useAddConsumer} from "../hooks/useAddConsumer";
import {useEditConsumer} from '../hooks/useEditConsumer';
import {useDeleteConsumer} from '../hooks/useDeleteConsumer';
import './style.css'
import { Form } from "antd";
import { APP_URL } from "../../../constants/APP_URL";
Modal.setAppElement("#root");

function Consumer() {
  const [form] = Form.useForm(); 
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_CONSUMERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = useAddConsumer(refetch, setIsModalOpen, setErrorMessage,form);
  const handleUpdate = useEditConsumer(refetch, setIsModalOpen, setErrorMessage);
  const handleDelete = useDeleteConsumer(refetch);

  const handleView = (consumer) => {
    setSelectedConsumer(consumer);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = (consumer) => {
    setSelectedConsumer(consumer);
    setFormData({
      name: consumer.name,
      address: consumer.address,
      email: consumer.email,
      phoneNumber: consumer.phoneNumber,
    });
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({ name: "", address: "", email: "", phoneNumber: "" });
    setModalMode("add");
    setIsModalOpen(true);
    setErrorMessage("");
  };

  const handleShowBranches = (consumerId) => {
    navigate(`${APP_URL.CONSUMERBRANCH.replace(":consumerId", consumerId)}`);
  };
  

const handlePhoneNumberChange = (e) => {
  const value = e.target.value;
  if (value === '' || /^\d{0,10}$/.test(value)) {
    setFormData({ ...formData, phoneNumber: value });
  }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: There was an error fetching the data.</p>;

  return (
    <>
      <h1>Consumer List</h1>
      <div className="consumer">
        <button className="consumer__add-button" onClick={openAddModal}>
          Add Customer
        </button>
      </div>

      <ConsumerList
        data={data}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleShowBranches={handleShowBranches}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel={modalMode === "view" ? "View Consumer" : modalMode === "edit" ? "Edit Consumer" : "Add Consumer"}
          className="consumer-modal"
        >
          <div className="modal-header">
            <h2>{modalMode === "view" ? "" : modalMode === "edit" ? "Edit Consumer" : "Add Consumer"}</h2>
          </div>
          {modalMode === "view" ? (
            <ConsumerView selectedConsumer={selectedConsumer}  onClose={() => setIsModalOpen(false)}/>
          ) : (
            <ConsumerForm
              form={form}
              formData={formData}
              setFormData={setFormData}
              handleAdd={handleAdd}
              handleUpdate={handleUpdate}
              selectedConsumer={selectedConsumer}
              modalMode={modalMode}
              setIsModalOpen={setIsModalOpen}
              errorMessage={errorMessage}
              handlePhoneNumberChange={handlePhoneNumberChange}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default Consumer;
