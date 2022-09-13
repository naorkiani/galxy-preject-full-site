import React, { createContext } from "react";
import Footer from "../component/footer";
import HeroImg from "../component/HeroImg";
import Navbar from "../component/navbar/Navbar";
import MessageScroll from "../component/posts/messgeScroll";
import TopCommentBox from "../component/posts/TopCoomentBox";
import { ContextProvider } from "../component/posts/messge/context";

class CostumClub extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <HeroImg />
        <TopCommentBox />
        <MessageScroll />
        <ContextProvider />
        <Footer />
      </div>
    );
  }
}

export default CostumClub;
