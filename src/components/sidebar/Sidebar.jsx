import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCog,
  FaSignOutAlt,
  FaBox,
  FaTruck,
  FaUserFriends,
  FaListUl,
} from "react-icons/fa";
// import './style.css'
// import Logout from "../components/Logout";

function Sidebar() {

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

  return (
    <div className="sidebar">
      <ul className="sidebarpage__content">
        {items.map((item, index) => (
          <li className="sidebarpage__item" key={index}>
            <Link to={item.key} className="sidebarpage__link">
              {item.icon}
              <span className="sidebarpage__text">{item.label}</span>
            </Link>
          </li>
        ))}

        {/* <li className="sidebarpage__item sidebarpage__item--logout">
          <FaSignOutAlt className="sidebarpage__icon" />
          <span className="sidebarpage__text">
            <Logout />
          </span>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
