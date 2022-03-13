import React, { useState } from "react";
import "./style.css";
import csc from "country-state-city";
import { useAlert } from "react-alert";

const PersonalDetails = ({setTab}) => {
  const alert = useAlert();
  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [pincode, setPincode] = useState("");

  const [countryid, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");

  function clearAll() {
    setName("");
    setFather("");
    setMother("");
    setMobile("");
    setCity("");
    setCountryId("");
    setCountryName("");
    setStateId("");
    setStateName("");
    setPincode("");
    setEmail("");
    setGender("");
  }

  function detailsValidate() {
    setName(String(name).trim());
    setFather(String(father).trim());
    setMother(String(mother).trim());
    setCountryName(String(countryName).trim());
    setStateName(String(stateName).trim());
    setCity(String(city).trim());

    if (
      name.length<4 ||
      father.length<4||
      mother.length<4||
      countryName.length<3||
      stateName.length<3||
      city.length<3||
      gender===""
    ) {
      return false;
    }
    return true;
  }
  function pinValidate() {
    setPincode(pincode.trim());
    if (pincode.length !== 6) {
      return false;
    }
    return true;
  }
  function mobileValidator() {
    if (
      mobile.charAt(0) === "0" ||
      mobile.charAt(0) === "1" ||
      mobile.charAt(0) === "2" ||
      mobile.charAt(0) === "3" ||
      mobile.charAt(0) === "4" ||
      mobile.charAt(0) === "5"
    ) {
      return false;
    }
    if (mobile.length !== 10) {
      return false;
    }
    return true;
  }

  function submitPersonalDetails(e) {
    e.preventDefault();
    const mobileValidation = mobileValidator();
    const pincodeValildation = pinValidate();
    const all = detailsValidate();

    console.log(mobileValidation,pincodeValildation,all)
    if (!mobileValidation || !pincodeValildation || !all) {
      alert.error("Some fields are missing or incorrect");
      return;
    }
    sessionStorage.setItem(
      "personal",
      JSON.stringify({
        name,
        father,
        mother,
        email,
        mobile,
        countryName,
        stateName,
        city,
        gender,
        pincode,
      })
    );
    clearAll();
    alert.success("Details saved successfully");
    setTab(2);
  }

  return (
    <div className="form">
      <form onSubmit={submitPersonalDetails}>
        <fieldset>
          <legend>
            <span className="number">1</span>Your Personal Details
          </legend>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your Name *"
          />
          <input
            value={father}
            onChange={(e) => setFather(e.target.value)}
            type="text"
            placeholder="Your Father's Name *"
          />
          <input
            value={mother}
            onChange={(e) => setMother(e.target.value)}
            type="text"
            placeholder=" Your Mother's Name *"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email *"
          />
          <input
            id="number"
            value={mobile}
            onChange={(e) => {
              if (String(e.target.value).length < 10) {
                setMobile(e.target.value);
                document.getElementById("number").style.border =
                  "1px solid red";
              } else if (String(e.target.value).length === 10) {
                document.getElementById("number").style.border = "none";
                setMobile(e.target.value);
              }
            }}
            type="number"
            placeholder="Your Mobile *"
          />
          <div className="radio">
            <span>Male</span>
            <input
              type="radio"
              onChange={() => setGender("M")}
              name="gender"
              value="M"
            />
            <span>Female</span>
            <input
              type="radio"
              onChange={() => setGender("F")}
              name="gender"
              value="F"
            />
            <span>Trangender</span>
            <input
              type="radio"
              onChange={() => setGender("T")}
              name="gender"
              value="T"
            />
          </div>
          <select
            onChange={(e) => {
              setCountryId(e.target.value);
              const cont = csc.getCountryById(e.target.value).name.toString();
              setCountryName(cont);
            }}
          >
            <option value="">Choose Your Country Name</option>
            {csc.getAllCountries().map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {countryName !== "" && (
            <select
              onChange={(e) => {
                setStateId(e.target.value);
                const stat = csc.getStateById(e.target.value).name.toString();
                setStateName(stat);
              }}
            >
              <option value="">Choose State Your Name</option>
              {csc.getStatesOfCountry(countryid).map((state) => (
                <option
                  key={state.id}
                  nameofstate={state.name}
                  value={state.id}
                >
                  {state.name}
                </option>
              ))}
            </select>
          )}
          {stateName !== "" && (
            <select onChange={(e) => setCity(e.target.value)}>
              <option value="">Choose your city</option>
              {csc.getCitiesOfState(stateId).map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          )}
          {city !== "" && (
            <input
              type="number"
              placeholder="pincode"
              value={pincode}
              id="pincode"
              onChange={(e) => {
                if (String(e.target.value).length < 6) {
                  setPincode(e.target.value);
                  document.getElementById("pincode").style.border =
                    "1px solid red";
                } else if (String(e.target.value).length === 6) {
                  document.getElementById("pincode").style.border = "none";
                  setPincode(e.target.value);
                }
              }}
            />
          )}
        </fieldset>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default PersonalDetails;
