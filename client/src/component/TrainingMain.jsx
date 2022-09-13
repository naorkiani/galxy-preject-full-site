import React from "react";
import "./TrainingStyle.css";
import { Link } from "react-router-dom";

import pod from "../assets/pod.jpeg";
import moon from "../assets/moon.jpeg";

const TrainingMain = () => {
  return (
    <div className="training">
      <div className="left">
        <h1>Training</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, magni
          ratione officiis similique molestias error eos aperiam, quo in eum
          accusamus alias fuga dolor vel magnam? Minus quis amet quibusdam?
        </p>
        <Link to="/contact">
          <button className="btn">contact</button>
        </Link>
      </div>
      <div className="right">
        <div className="img-container">
          <div className="image-stack top">
            <img src={moon} className="img" />
          </div>
          <div className="image-stack bottom">
            <img src={pod} className="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingMain;
