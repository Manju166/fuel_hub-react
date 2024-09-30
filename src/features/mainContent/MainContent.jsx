import React, { useRef } from "react";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import './style.css'
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
          <div className="breadcrumb">
            <span>
              <Link to="/">Dashboard</Link>
            </span>{" "}
            /{" "}
            <Link to="/consumer">
              <span>Consumer List</span>{" "}
            </Link>
          </div>
          <div className="dashboard_card">
            <div className="dashboard_card-box">
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Total Menu</p>
              </div>
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Total Order</p>
              </div>
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Pending Order</p>
              </div>
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Canceled Order</p>
              </div>
              <div className="dashboard_card-box_item">
                <p>235</p>
                <p>Complete Order</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit autem animi quaerat quidem veritatis, iste placeat. Maxime cum praesentium sunt cumque distinctio dicta, nemo tempora ipsum et alias mollitia aspernatur.
      Architecto soluta tenetur delectus saepe dolores ipsa velit illo omnis! Explicabo, harum quaerat. Reprehenderit officia dolorem vero voluptates molestias blanditiis necessitatibus provident possimus eum cumque culpa nostrum, assumenda, explicabo optio.
      Repellat saepe cum deleniti tempore mollitia, maiores sint laudantium nesciunt! Numquam in dolore aliquid eligendi quod ipsam illum dignissimos qui vero molestiae! Libero tenetur maiores facilis beatae, sed explicabo error?
      Quibusdam officiis natus saepe sunt, placeat perspiciatis, ducimus, nobis molestiae iste facere suscipit totam obcaecati accusamus aliquid in itaque aperiam minus officia hic tempore debitis aut eius! Obcaecati, ratione odio!
      Eveniet, hic quia! Facilis eius exercitationem magnam eos itaque maxime ut natus placeat. At et itaque dignissimos deserunt eveniet error iure veniam recusandae? Hic voluptatem quod, laboriosam excepturi sed quisquam.
      Delectus sapiente dicta nobis eligendi ipsam, molestias assumenda temporibus, nesciunt dolorem amet iste soluta? Accusamus aliquam dolor debitis iusto reprehenderit ut quisquam sint sed est eum itaque ad, consequatur natus.
      Deserunt vitae minima illum molestias iste ullam unde ipsum hic eos eius dolorem nesciunt nulla, earum quisquam enim. Repellat, veniam adipisci? Voluptatibus voluptatum autem nisi aperiam enim beatae a laudantium.
      Itaque quas, soluta ut maxime sed hic recusandae voluptatibus expedita veniam, minima magni quis, dicta illum? Repudiandae, aspernatur, quam molestias hic, ipsa voluptate quis asperiores culpa placeat similique inventore corrupti?
      Atque labore illo nam quo officia, saepe, omnis assumenda eius excepturi, expedita ratione iste animi! Eum sunt ea facere, explicabo voluptatem natus voluptas quidem mollitia ratione fugiat, cupiditate modi commodi.
      Atque recusandae a eveniet facilis! Blanditiis esse quasi itaque quo, unde consectetur laboriosam ad magnam nihil qui rerum architecto sit praesentium eligendi ex incidunt harum? Unde, minima ullam. Ipsum, laborum.
    </div>
  );
}

export default MainContent;
