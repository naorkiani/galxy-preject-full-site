import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Pricing from "./routes/pricing";
import Training from "../src/routes/Training";
import Contact from "./routes/Contact";
import Register from "./routes/SignUp";
import FlyCard from "./routes/fly-card";
import Login from "./routes/Login";
import MyFavLanch from "./routes/MyFavLanch";
import RestPassword from "./routes/resetPass";
import CardDetailsConvertor from "./routes/card-Details/CardDetailsConvertor";
import CreateCard from "./routes/createCard";
import { getCurrentUser } from "./services/userServices";

const user = getCurrentUser();

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/training" element={<Training />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/flycard" element={<FlyCard />} />
        <Route path="/myfavLanch" user={user} element={<MyFavLanch />} />
        <Route path="/resetpss" element={<RestPassword />} />
        <Route path="/createcard" element={<CreateCard />} />
        <Route path="/card-details/:id" element={<CardDetailsConvertor />} />
      </Routes>
    </>
  );
}

export default App;
