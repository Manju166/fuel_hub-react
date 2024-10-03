import React from "react";
import './style.css'
import Button from "../../../../components/Button/Button";
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
            <Button
              className="button--primary"
              type="button"
              onClick={() => handleAdd(formData, consumerId)} label="Add"
            />
          ) : (
            <Button
              className="button--primary"
              type="button"
              onClick={() => handleUpdate(formData, consumerId)} label="Update"
            />
              
          )}
          <Button
            className="button--cancel"
            type="button"
            onClick={() => setIsModalOpen(false)}
            label="Cancel"
          />
        </div>
      </form>
    </div>
  );
}

export default OutletForm;
