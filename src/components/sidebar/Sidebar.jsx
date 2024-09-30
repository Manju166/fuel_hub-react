import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCog,
  FaBox,
  FaTruck,
  FaUserFriends,
  FaListUl,
} from "react-icons/fa";
import './style.css';

function Sidebar() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      key: "/dashboard/",
    },
    {
      label: "Order",
      icon: <FaListUl />,
      key: "/dashboard/order",
    },
    {
      label: "Products",
      icon: <FaBox />,
      key: "/dashboard/product",
    },
    {
      label: "Resources",
      icon: <FaTruck />,
      key: "/dashboard/resource",
    },
    {
      label: "Consumers",
      icon: <FaUserFriends />,
      key: "/dashboard/consumer",
    },
    {
      label: "Settings",
      icon: <FaCog />,
      key: "/dashboard/settings",
    },
  ];

  const handleClick = (key) => {
    navigate(key);
  };

  return (
    <div className="sidebarpage">
      <ul className="sidebarpage__content">
        {items.map((item, index) => (
          <li className="sidebarpage__item" key={index}>
            <div
              className="sidebarpage__link"
              onClick={() => handleClick(item.key)}
            >
              {item.icon}
              <span className="sidebarpage__text">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
