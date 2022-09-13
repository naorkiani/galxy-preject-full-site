import React from "react";
import "./footerStyle.css";
import {
  FaFacebook,
  FaLinkedin,
  FaMailBulk,
  FaPhone,
  FaSearchLocation,
  FaTwitter,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="left">
          <div className="location">
            <FaSearchLocation
              size={20}
              style={{ color: "#fffff", marginRight: "2rem" }}
            />

            <div>
              <p>123 Acme st.</p>
              <h4>Houston, tx</h4>
            </div>
          </div>
          <div className="phone">
            <h4>
              {" "}
              <FaPhone
                size={20}
                style={{ color: "#fffff", marginRight: "2rem" }}
              />
              1-800-800-1233
            </h4>
          </div>
          <div className="email">
            <h4>
              <FaMailBulk
                size={20}
                style={{ color: "#fffff", marginRight: "2rem" }}
              />
              tripInSpace@glxTrvel.com
            </h4>
          </div>
        </div>
        <div className="right">
          <h4>about the company</h4>
          <p>
            the company is take you to space and bla bla bla and yada yada yada
            and text to example
          </p>
          <div className="social ">
            <FaFacebook
              size={30}
              style={{ color: "#fffff", marginRight: "1rem" }}
            />
            <FaTwitter
              size={30}
              style={{ color: "#fffff", marginRight: "1rem" }}
            />
            <FaLinkedin
              size={30}
              style={{ color: "#fffff", marginRight: "1rem" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
