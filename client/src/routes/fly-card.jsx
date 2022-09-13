import React from "react";
import Footer from "../component/footer";
import HeroImg from "../component/HeroImg";
import Navbar from "../component/navbar/Navbar";
import Loader from "../component/Loader";
import SearchBar from "../component/SearchBar";
import CardExtends from "../Cards/CardExtend";
import DisplayControllers from "../component/DisplyModes/DisplayControllers";
import { getCards } from "../services/cardService";
import DisplayModes from "../component/DisplyModes/DisplayModes";

class flyCards extends CardExtends {
  state = {
    Data: [],
    cards: [],
    isMounted: false,
    display: "cards",
  };

  async componentDidMount() {
    try {
      const { data } = await getCards();
      this.setState({ data, cards: data, isMounted: true });
    } catch (error) {
      console.log(error);
      console.log("no get card");
    }
  }

  render() {
    const cards = [...this.state.cards];
    const { isMounted, display } = this.state;
    if (!isMounted) return <Loader />;
    return (
      <div>
        <React.Fragment>
          <Navbar />
          <HeroImg heading="fly-card" text="buy and fly." />

          <div className="container">
            <SearchBar
              placeholder="Enter fly-card name or number"
              handleChange={this.handleChange}
            />
            <DisplayControllers
              display={display}
              handleDisplay={this.handleDisplay}
            />
            <DisplayModes
              cards={cards}
              handleDelete={this.handleDelete}
              changeLikeStatus={this.changeLikeStatus}
              display={display}
            />
          </div>
          <Footer />
        </React.Fragment>
      </div>
    );
  }
}

export default flyCards;
