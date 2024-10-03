import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import './pageroutes.css'
import Footer from "../components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import MainContent from "../features/mainContent/MainContent";
import { APP_URL } from "../constants/APP_URL";
import Consumer from "../features/consumers/pages/Consumer";
import Products from "../features/products/pages/Product";
import Resource from "../features/resources/pages/REsource";
import Order from "../features/order/pages/Order";
import ConsumerBranch from "../features/consumerBranch/pages/ConsumerBranch";
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
            <Route path={APP_URL.DASHBOARD} element={<MainContent />} />
            <Route path={APP_URL.CONSUMER} element={<Consumer/>}/>
            <Route
              path={APP_URL.CONSUMERBRANCH}
              element={<ConsumerBranch />}
            />
            <Route path={APP_URL.PRODUCT} element={<Products/>}/>
            <Route path={APP_URL.RESOURCE} element={<Resource/>}/>
            <Route path={APP_URL.ORDER} element={<Order/>}/>
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PageRoutes;
