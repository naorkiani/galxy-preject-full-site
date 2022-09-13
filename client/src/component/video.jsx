import React from "react";
import "./videoStyle.css";
import { Link } from "react-router-dom";
import VideoSpace from "../assets/spaceVid.mp4";

const Video = () => {
  return (
    <div className="hero">
      <video autoPlay loop muted id="video">
        <source src={VideoSpace} type="video/mp4" />
      </video>
      <div className="content">
        <h1>Galaxy. travel.</h1>
        <p>World's first civilian space travel.</p>

        <div>
          <Link to="/training" className="btn">
            Training
          </Link>
          <Link to="/contact" className="btn btn-light">
            Launch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Video;
