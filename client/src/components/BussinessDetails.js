import { useAlert } from "react-alert";
import { useState } from "react";

const BussinessDetails = ({setTab}) => {

  const alert = useAlert();
  const [bussinessName, setBussinessName] = useState("");
  const [bussinessId, setBussinessId] = useState("");
  const [bussinessType, setBussinessType] = useState("");
  const [bussinessLocation, setBussinessLocation] = useState("");
  const [bussinessRevenue, setBussinessRevenue] = useState("");
  const [gst, setGST] = useState("");

  function clearAll() {
    setBussinessName("");
    setBussinessId("");
    setBussinessType("");
    setBussinessLocation("");
    setBussinessRevenue("");
    setGST("");
  }
  function validateAll() {
    setBussinessName(String(bussinessName).trim());
    setBussinessId(String(bussinessId).trim());
    setBussinessType(String(bussinessType).trim());
    setBussinessLocation(String(bussinessLocation).trim());
    setBussinessRevenue(String(bussinessRevenue).trim());
    setGST(String(gst).trim());

    if (
      bussinessName.length < 2 ||
      bussinessId.length < 5 ||
      bussinessType.length < 3 ||
      bussinessLocation.length < 20 ||
      bussinessRevenue.length === 0 ||
      gst.length < 5
    ) {
      return false;
    }
    return true;
  }
  function submitBussinessDetails(e) {
    e.preventDefault();
    const validation = validateAll();
    if (!validation) {
      alert.error("Validation failed ! . Please fill correct details");
      return true;
    }
    sessionStorage.setItem(
      "bussiness",
      JSON.stringify({
        bussinessName,
        bussinessType,
        bussinessLocation,
        bussinessRevenue,
        bussinessId,
        gst,
      })
    );
    clearAll();
    alert.success("Details saved successfully");
    setTab(3);

  }
  return (
    <div className="form">
      <form onSubmit={submitBussinessDetails}>
        <fieldset>
          <legend>
            <span className="number">2</span>Your Bussiness Details
          </legend>
          <input
            value={bussinessName}
            onChange={(e) => setBussinessName(e.target.value)}
            type="text"
            placeholder="Your Bussiness Name *"
          />
          <input
            value={bussinessId}
            onChange={(e) => setBussinessId(e.target.value)}
            type="text"
            placeholder="Registration ID *"
          />
          <input
            value={bussinessLocation}
            onChange={(e) => setBussinessLocation(e.target.value)}
            type="text"
            placeholder="Location *"
          />
          <input
            value={bussinessType}
            onChange={(e) => setBussinessType(e.target.value)}
            type="text"
            placeholder="Bussiness type"
          />
          <input
            value={bussinessRevenue}
            onChange={(e) => setBussinessRevenue(e.target.value)}
            type="number"
            placeholder="Average Revenue Per Month"
          />
          <input
            value={gst}
            onChange={(e) => setGST(e.target.value)}
            type="text"
            placeholder="GST NO"
          />
        </fieldset>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default BussinessDetails;
