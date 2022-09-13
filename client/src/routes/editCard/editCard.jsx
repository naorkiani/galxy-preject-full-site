import React from "react";
import Form from "../../components/Form/Form";
import Joi from "joi-browser";
import Navbar from "../../component/navbar/Navbar";
import { toast } from "react-toastify";
import { editCard, getCard } from "../../services/cardService";
import { Link, Navigate } from "react-router-dom";
import Loader from "../../components/Loader";

class EditCard extends Form {
  state = {
    data: {},
    errors: {},
    isCardEdit: false,
    isMounted: false,
  };

  schema = {
    title: Joi.string().min(2).max(256).required().label("Title"),
    subTitle: Joi.string().min(2).max(256).required().label("Subtitle"),
    description: Joi.string().min(2).max(1024).required().label("Description"),
    address: Joi.string().min(2).required().max(256).label("Address"),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    url: Joi.string().min(11).max(1024).uri().allow("").label("Image"),
    alt: Joi.string().min(2).max(256).allow("").label("Alt"),
  };

  async componentDidMount() {
    try {
      const { id } = this.props;
      const { data: card } = await getCard(id);
      this.setState({ isMounted: true, data: this.mapToModel(card) });
    } catch (error) {
      this.setState({ errors: { alt: error.message } });
    }
  }

  mapToModel(card) {
    const {
      title,
      flight,
      description,
      addressLaunch,
      phone,
      image: { url, alt },
      Flightdate,
    } = card;
    return {
      title,
      flight,
      description,
      addressLaunch,
      phone,
      url,
      alt,
      Flightdate,
    };
  }

  doSubmit = async () => {
    try {
      const card = { ...this.state.data };
      const { id } = this.props;
      card._id = id;
      if (!card.url)
        card.url =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      if (!card.alt) card.alt = "Pic Of Business Card";
      await editCard(card);
      toast.success("your card was been edit successfully");
      this.setState({ isCardEdit: true });
    } catch (error) {
      this.setState({ errors: { alt: error.message } });
    }
  };

  render() {
    const { isCardEdit, isMounted } = this.state;
    //if (!isMounted) return <Loader />;
    if (isCardEdit) return <Navigate replace to="/my-cards" />;

    return (
      <div
        style={{ minHeight: "85vh" }}
        className="container-fluid bg-light pb-4"
      >
        <div className="container">
          <Navbar
            heading="Edit Card"
            text="Here you can edit your business card"
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
              {this.renderInput("addresslaunch", "addressLaunch")}
              {this.renderInput("flightdate", "Flightdate")}
              {this.renderInput("phone", "Phone")}
              {this.renderInput("url", "Image")}
              {this.renderInput("alt", "Alt")}
              {this.renderButton("Edit Card")}

              <Link to="/my-cards">
                <span className="btn btn-danger mt-1 col-12">Cancel</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
