import React from "react";
import './style.css'
function OutletForm({ formData, setFormData, consumerId, handleAdd, handleUpdate, modalMode, setIsModalOpen }) {
  return (
    <div className="outlet-form">
      <form className="outlet-form__form">
        <div className="outlet-form__group">
          <label className="outlet-form__label">Name</label>
          <input
            className="outlet-form__input"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="outlet-form__group">
          <label className="outlet-form__label">Branch Address</label>
          <input
            className="outlet-form__input"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div className="outlet-form__footer">
          {modalMode === "add" ? (
            <button
              className="outlet-form__button outlet-form__button--add"
              type="button"
              onClick={() => handleAdd(formData, consumerId)}
            >
              Add
            </button>
          ) : (
            <button
              className="outlet-form__button outlet-form__button--update"
              type="button"
              onClick={() => handleUpdate(formData,consumerId)}
            >
              Update
            </button>
          )}
          <button
            className="outlet-form__button outlet-form__button--cancel"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default OutletForm;
