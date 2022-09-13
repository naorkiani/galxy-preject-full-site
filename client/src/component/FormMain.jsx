import React from "react";
import "./FormMainStyle.css";

const Form = () => {
  return (
    <div className="form-container">
      <form>
        <label to="name">Your Name </label>
        <input type="text" id="name"></input>
        <label>Email </label>
        <input type="email" id="email"></input>t<label>Subject </label>
        <input type="text"></input>
        <label>Details</label>
        <textarea rows="6" placeholder="Type a short message here" />
        <input type="submit" value="submit" className="btn"></input>
      </form>
    </div>
  );
};

export default Form;
