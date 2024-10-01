import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AgGridReact } from "ag-grid-react";
import Modal from "react-modal";
import { GET_OUTLETS } from "../graphql/ConsumerBranchQuery";
import { useAddOutlet } from "../hooks/useAddOutlet";
import { useEditOutlet } from "../hooks/useEditOutlet";
import { useDeleteOutlet } from "../hooks/useDeleteOutlet";
import OutletList from "../components/OutletList";
import OutletView from "../components/OutletView";
import OutletForm from "../components/OutletForm";
import './style.css'
import { APP_URL } from "../../../constants/APP_URL";
Modal.setAppElement("#root");

function ConsumerBranch() {
  const { consumerId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [formData, setFormData] = useState({ name: "", address: "", consumerId: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_OUTLETS, {
    variables: { id: consumerId },
  });

  const handleAdd = useAddOutlet(refetch, setIsModalOpen, setErrorMessage);
  const handleUpdate = useEditOutlet(refetch, setIsModalOpen, setErrorMessage);
  const handleDelete = useDeleteOutlet(refetch);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: There was an error fetching the data.</p>;

  const openAddModal = () => {
    setFormData({ name: "", address: "", consumerId });
    setModalMode("add");
    setIsModalOpen(true);
    setErrorMessage("");
  };

  return (
    <div className="consumerBranch">
      <h1>Outlet List for Consumer {consumerId}</h1>
      <div className="consumerheader">
        <div className="breadcrumb">
          <span><Link to={APP_URL.DASHBOARD}>Dashboard</Link></span> /{" "}
          <Link to={APP_URL.CONSUMER}><span>Consumer List</span></Link>
        </div>
        <button className="table-container__add-branch-btn" onClick={openAddModal}>
          Add Outlet
        </button>
      </div>

      <OutletList
        outlets={data.outlets.consumerOutlets}
        handleView={setSelectedBranch}
        handleEdit={setSelectedBranch}
        handleDelete={handleDelete}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel={modalMode === "view" ? "View Outlet" : modalMode === "edit" ? "Edit Outlet" : "Add Outlet"}
          className="consumer-modal"
        >
          <div className="modal-header">
            <h2>{modalMode === "view" ? "View Outlet" : modalMode === "edit" ? "Edit Outlet" : "Add Outlet"}</h2>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {modalMode === "view" ? (
            <OutletView selectedBranch={selectedBranch} />
          ) : (
            <OutletForm
              formData={formData}
              setFormData={setFormData}
              consumerId={consumerId}
              handleAdd={handleAdd}
              handleUpdate={handleUpdate}
              modalMode={modalMode}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default ConsumerBranch;
