import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import './pageroutes.css'
import Footer from "../components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import MainContent from "../features/mainContent/MainContent";
function PageRoutes() {

  return (
    <div
      className="whole-box"
    >
      <div className="nav">
        <Navbar />
      </div>

      <div className="main-div">
        <div className="sidebarpage">
          <Sidebar />
        </div>
        <div className="display">
          <Routes>
            <Route path="/" element={<MainContent />} />
            {/* <Route path="product" element={<Products />} />
            <Route path="consumer" element={<Consumer />} />
            <Route path="resource" element={<Resource />} />
            <Route path="orderList" element={<Order />} />
            <Route path="order" element={<Order />} /> */}
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PageRoutes;
