import { useState, useRef } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

const LoanDetails = ({ setTab }) => {
  const alert = useAlert();
  const [loanAmount, setLoanAmount] = useState("");
  const [loanReason, setLoanReason] = useState("");
  const [loanPeriod, setLoadnPeriod] = useState("");
  const [loanSecurityType, setLoanSecurityType] = useState("");
  const [gauranter, setGauranter] = useState("");
  const ref = useRef(null);

 function clearAll(params) {
  setLoanAmount("");
  setLoanReason("");
  setLoadnPeriod("");
  setLoanSecurityType("");
  setGauranter("");
   
 }

  function validateAll() {
    setLoanReason(String(loanReason).trim());
    setLoanSecurityType(String(loanSecurityType).trim());
    setGauranter(String(gauranter).trim());

    if (loanReason.length < 10) {
      alert.error("Please provide a valid explanatory reason");
      return false;
    }

    if (loanSecurityType.length < 5) {
      alert.error("Please provide a valid explanatory security type");
      return false;
    }
    if (gauranter.length === 0) {
      alert.error("Please provide a valid gauranter details");
      return false;
    }
    return true;
  }
 async function loanDetailsSubmit(e) {
    e.preventDefault();
    ref.current.disabled = true;
    const validate = validateAll();
    console.log(validate);
    if (!validate) {
      ref.current.disabled = false;
      return;
    }
    const personal = sessionStorage.getItem("personal");
    const bussiness = sessionStorage.getItem("bussiness");
    const config = {
      headers: { "Content-type": "application/json; charset=UTF-8" },
    };
    try {
      const { data } = await axios.post(
        "/api/save",
        {
          loanDetails: {
            loanAmount,
            loanPeriod,
            loanReason,
            gauranter,
            loanSecurityType,
          },
          personalDetails: JSON.parse(personal),
          bussinessDetails: JSON.parse(bussiness),
        },
        config
      );
      if(data) {
        clearAll();
        sessionStorage.removeItem("personal");
        sessionStorage.removeItem("bussiness");
        alert.success("Form submitted to server successfully.You can fill another form");
        ref.current.disabled = false;
        setTab(1);

      }
    } catch (error) {
      alert.error("Some server side error");
      console.log(error);
      ref.current.disabled = false;
    }
  }
  return (
    <div className="form">
      <form onSubmit={loanDetailsSubmit}>
        <fieldset>
          <legend>
            <span className="number">3</span>Your Loan Details
          </legend>
          <input
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            type="numer"
            placeholder="Amount of Loan Required *"
          />
          <input
            value={loanReason}
            onChange={(e) => setLoanReason(e.target.value)}
            type="text"
            placeholder="Reason of taking this loan *"
          />
          <input
            value={loanPeriod}
            onChange={(e) => setLoadnPeriod(e.target.value)}
            type="number"
            placeholder="Time Period of Loan Reibursement in Months"
          />
          <input
            type="text"
            value={loanSecurityType}
            onChange={(e) => setLoanSecurityType(e.target.value)}
            placeholder="Type of Security  You Can Provide"
          />
          <select onChange={(e) => setGauranter(e.target.value)}>
            <option value="">Choose a type of gauranter</option>
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="uncle">Uncle</option>
            <option value="grandfather">Grandfather</option>
            <option value="grandmother">Grandmother</option>
            <option value="sister">Sister</option>
            <option value="brother">Brother</option>
            <option value="friend">Friend</option>
            <option value="aunt">Aunt</option>
          </select>
        </fieldset>
        <input ref={ref}  type="submit" value="Save" />
      </form>
    </div>
  );
};

export default LoanDetails;
