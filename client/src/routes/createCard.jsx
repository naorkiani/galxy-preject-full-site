import React from "react";
import Form from "../component/Form/Form";
import Joi from "joi-browser";
// import { toast } from "react-toastify";
import { createCard } from "../services/cardService";
import { Link, Navigate } from "react-router-dom";
import HeroImg from "../component/HeroImg";
import Navbar from "../component/navbar/Navbar";

class CreateCards extends Form {
  state = {
    data: {
      title: "",
      flight: "",
      description: "",
      addressLaunch: "",
      phone: "",
      url: "",
      alt: "",
    },
    errors: {},
    isCardCreated: false,
  };

  schema = {
    title: Joi.string().min(2).max(256).required().label("Title"),
    flight: Joi.string().min(2).max(256).required().label("flight"),
    description: Joi.string().min(2).max(1024).required().label("Description"),
    addressLaunch: Joi.string()
      .min(2)
      .required()
      .max(256)
      .label("addressLaunch"),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    url: Joi.string().min(11).max(1024).uri().allow("").label("Image"),
    alt: Joi.string().min(2).max(256).allow("").label("Alt"),
  };

  doSubmit = async () => {
    try {
      console.log("sub");
      const card = { ...this.state.data };
      if (!card.url) delete card.url;
      if (!card.alt) delete card.alt;
      await createCard(card);
      //   toast.success("your new card was been created successfully");
      this.setState({ isCardCreated: true });
    } catch (error) {
      this.setState({ errors: { alt: error.message } });
    }
  };

  render() {
    const { user } = this.props;
    // if (!user || (user && !user.isAdmin)) return <Navigate replace to="/" />;

    const { isCardCreated } = this.state;
    if (isCardCreated) return <Navigate replace to="/my-cards" />;

    return (
      <div
        style={{ minHeight: "85vh" }}
        className="container-fluid bg-light pb-4"
      >
        <Navbar />
        <div className="container">
          <HeroImg
            heading="Create Card"
            text="Hear you can create a business card"
          />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            >
              {this.renderInput("title", "Title")}
              {this.renderInput("flight", "Flight")}
              {this.renderTextarea("description", "Description")}
              {this.renderInput("addressLaunch", "AddressLaunch")}
              {this.renderInput("phone", "Phone")}
              {this.renderInput("url", "Image")}
              {this.renderInput("alt", "Alt")}
              {this.renderButton("Create Card", "create card")}

              <Link to="/my-lanch">
                <span className="btn btn-danger mt-1 col-12">Cancel</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCards;
