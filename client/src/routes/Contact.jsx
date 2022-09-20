import React from "react";
import Footer from "../component/footer";
import HeroImg from "../component/HeroImg";
import Navbar from "../component/navbar/Navbar";
import Form from "../component/Form/Form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import "../component/FormMain";
import { sendContact } from "../services/userServices";

class Contact extends Form {
  state = {
    data: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    errors: {},
    // isRegistered: false,
  };
  schema = {
    name: Joi.string().required().min(2).label("Name"),
    email: Joi.string().required().email().label("Email"),
    subject: Joi.string().required().min(6).label("subject"),
    message: Joi.string().required().min(6).label("details"),
  };
  doSubmit = async () => {
    try {
      console.log("submit");
      const data = { ...this.state.data };

      await sendContact(data);

      // toast.success(`${user.name} you signup successfully`);
      delete data.userName;

      window.location = "/";
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400)
        this.setState({
          errors: { error: "error get data" },
        });
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <HeroImg heading="contact." text="contact GLX Travel" />
        <form
          onSubmit={this.handleSubmit}
          autoComplete="off"
          method="POST"
          className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
        >
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("subject", "Subject")}
          {this.renderTextarea("message", "Message")}
          {this.renderButton("send-contact", "Send-Contact")}
          <Link to="/">
            <span className="btn btn-danger mt-1 col-12">Cancel</span>
          </Link>
        </form>
        <Footer />
      </div>
    );
  }
}

export default Contact;

