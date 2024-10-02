import React, { useState } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { Modal, Button } from 'antd';
import logo from '../../assets/image.png';
import './style.css';
import Logout from '../Logout/Logout';

function Navbar() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleViewProfile = () => {
    console.log('Viewing profile...');
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="navbar">
      <img src={logo} alt="fuelhub" className="navbar__logo" />

      <div className="navbar__right">
        <FaBell className="navbar__notification-icon" />
        <FaUser 
          className="navbar__user-icon" 
          onClick={showModal} 
        />
      </div>

      <Modal
      className='modal'
        title="Admin Dashboard"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} 
      >
        <div className="navbar__modal-content">
          <Button className="navbar__modal-button" onClick={handleViewProfile}>
            View Profile
          </Button>
          <span>
          <Logout/>
          </span>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
