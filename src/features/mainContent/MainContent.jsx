import React, { useRef } from "react";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import './style.css'
import Button from "../../components/Button/Button";
function MainContent() {
  const typedRef = useRef(null);
  const handleTypingComplete = () => {
    if (typedRef.current) {
      typedRef.current.reset();
    }
  };

  return (
    <div
      className="main-content-container">

      <div className="dashboard_container">
        <div className="text-dash">
          <div className="dashboard-heading">
            <ReactTyped
              strings={["Welcome to dashboard !!!", "Welcome to FUELHUB !!!"]}
              typeSpeed={30}
              loop
              onComplete={handleTypingComplete}
            />
          </div>
          <div className="dashboard_card">
            <div className="dashboard_card-box">
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Total Consumers</p>
              </div>
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Total Order</p>
              </div>
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Products</p>
              </div>
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Resources</p>
              </div>
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Complete Order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
