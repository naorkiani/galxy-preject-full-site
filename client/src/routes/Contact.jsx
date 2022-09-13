import React from "react";
import Footer from "../component/footer";
import HeroImg from "../component/HeroImg";
import Navbar from "../component/navbar/Navbar";
import Form from "../component/FormMain.jsx";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <HeroImg heading="contact." text="contact GLX Travel" />
      <Form />
      <Footer />
    </div>
  );
};

export default Contact;
