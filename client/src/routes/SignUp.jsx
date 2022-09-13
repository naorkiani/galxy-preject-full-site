import React from "react";
import Form from "../component/Form/Form";
import Joi from "joi-browser";
import HeroImg from "../component/HeroImg";
import Navbar from "../component/navbar/Navbar";
import { getCurrentUser, login, register } from "../services/userServices";
//import toast from "tostify";
import { Navigate } from "react-router-dom";

class SignUp extends Form {
  state = {
    data: {
      userName: "",
      email: "",
      password: "",
    },
    errors: {},
    isRegistered: false,
  };
  schema = {
    userName: Joi.string().required().min(2).label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };
  doSubmit = async (e) => {
    console.log("submit");
    try {
      const user = { ...this.state.data };

      await register(user);
      // toast.success(`${user.name} you signup successfully`);
      delete user.userName;
      await login(user);
      window.location = "/";
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400)
        this.setState({
          errors: { email: "This user is already registered!" },
        });
    }
  };
  render() {
    const user = getCurrentUser();
    if (user) return <Navigate replace to="/" />;

    const { isRegistered } = this.state;
    if (isRegistered) return <Navigate to="/login" />;

    return (
      <div
        style={{ minHeight: "85vh" }}
        className="container-fluid bg-light pb-4"
      >
        <Navbar />
        <div className="container">
          <HeroImg
            heading="SignUp Page"
            text="hear you can signUp and start "
          />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            >
              {this.renderInput("userName", "Name")},
              {this.renderInput("email", "Email", "email")},
              {this.renderInput("password", "Password", "password")}, //
              {this.renderButton("register", "signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
