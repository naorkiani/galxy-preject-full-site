import React from "react";
import { Link } from "react-router-dom";
import "./pricingCompStyle.css";

const PricingComp = () => {
  return (
    <div className="pricing">
      <div className="card-container">
        <div className="card">
          <h3>- basic -</h3>
          <span className="bar"></span>
          <p className="btc">1 BTC</p>
          <p>- 3 days -</p>
          <p>- Views -</p>
          <p>- Featured -</p>
          <p>- Private Quarters -</p>
          <Link to="/content" className="btn">
            Book now
          </Link>
        </div>
        <div className="card">
          <h3>- Suite -</h3>
          <span className="bar"></span>
          <p className="btc">1 BTC</p>
          <p>- 3 days -</p>
          <p>- Views -</p>
          <p>- Featured -</p>
          <p>- Private Quarters -</p>
          <Link to="/content" className="btn">
            Book now
          </Link>
        </div>
        <div className="card">
          <h3>- Executive -</h3>
          <span className="bar"></span>
          <p className="btc">1 BTC</p>
          <p>- 3 days -</p>
          <p>- Views -</p>
          <p>- Featured -</p>
          <p>- Private Quarters -</p>
          <Link to="/content" className="btn">
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingComp;
