import React from "react";
import Footer from "../component/footer";
import HeroImg from "../component/HeroImg";
import Navbar from "../component/navbar/Navbar";
import TrainingMain from "../component/TrainingMain";

const Training = () => {
  return (
    <div>
      <Navbar />
      <HeroImg heading="TRAINING." text="pre-Flight & In-Flight Training." />
      <TrainingMain />
      <Footer />
    </div>
  );
};

export default Training;
