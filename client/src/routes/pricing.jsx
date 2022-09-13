import React from "react";
import Footer from "../component/footer";
import HeroImage from "../component/HeroImg";
import Navbar from "../component/navbar/Navbar";
import PricingComp from "../component/pricingcomp";

const Pricing = () => {
  return (
    <div>
      <Navbar />
      <HeroImage heading="PRICING." text="Choose your trip." />
      <PricingComp />
      <Footer />
    </div>
  );
};

export default Pricing;
