import React from "react";
import Form from "../component/Form/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getCurrentUser, login } from "../services/userServices";
import { Navigate } from "react-router-dom";
import Navbar from "../component/navbar/Navbar";
import HeroImg from "../component/HeroImg";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    try {
      const user = { ...this.state.data };
      await login(user);
      toast.success("you logged successfully");
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        this.setState({
          errors: { email: "Invalid email or password" },
        });
    }
  };

  render() {
    const user = getCurrentUser();
    if (user) return <Navigate replace to="/" />;

    return (
      <div
        style={{ minHeight: "85vh" }}
        className="container-fluid bg-light pb-4"
      >
        <Navbar />
        <div className="container">
          <HeroImg
            heading="Login Page"
            text="Hear you can login and start fly."
          />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login", "signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
