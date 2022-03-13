import PersonalDetails from "./components/PersonalDetails";
import LoanDetails from "./components/LoanDetails";
import BussinessDetails from "./components/BussinessDetails";
import "./App.css";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";


function App() {
  const alert = useAlert();
  const [tab, setTab] = useState(1);
  var personal = sessionStorage.getItem("personal");
  var bussiness = sessionStorage.getItem("bussiness");
  /**********  This useEffect  switchs tabs depending upon fillled form  **************************** */
  useEffect(() => {
    personal = sessionStorage.getItem("personal");
    bussiness = sessionStorage.getItem("bussiness");
    document.querySelectorAll(".tab").forEach((elm) => {
      elm.classList.remove("current");
    });
    document.getElementById(`tab${tab}`).classList.add("current");
  }, [tab]);

  return (
      <section className="container">
        <div className="tabswitcher">
          <div id="tab1" className="current tab" onClick={(e) => setTab(1)}>
            Personal Details
          </div>
          <div
            id="tab2"
            className="tab"
            onClick={(e) => {
              if (personal) {
                setTab(2);
              } else {
                alert.show("Please fill personal details first");
              }
            }}
          >
            Bussiness details
          </div>
          <div
            id="tab3"
            className="tab"
            onClick={(e) => {
              if (bussiness) {
                setTab(3);
              } else {
                alert.show("Please fill previous details first");

              }
            }}
          >
            Loan Details
          </div>
        </div>
        {tab === 1 && <PersonalDetails setTab={setTab} />}
        {tab === 2 && <BussinessDetails setTab={setTab} />}
        {tab === 3 && <LoanDetails setTab={setTab} />}
      </section>
  );
}

export default App;
