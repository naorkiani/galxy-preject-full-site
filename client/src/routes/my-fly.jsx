import React from "react";

import { getMyCards } from "../services/cardService";
import CardExtends from "../Cards/CardExtend";
import Cards from "../Cards/Cards";
import { Link, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import HeroImg from "../component/HeroImg";

class MyCards extends CardExtends {
  state = {
    data: [],
    cards: [],
    isMounted: false,
  };

  async componentDidMount() {
    try {
      const { data } = await getMyCards();
      this.setState({ data, cards: data, isMounted: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { user } = this.props;
    if (!user || (user && !user.biz)) return <Navigate replace to="/" />;

    const cards = [...this.state.cards];
    const { isMounted } = this.state;
    // if (!isMounted) return <Loader />;

    return (
      <React.Fragment>
        <HeroImg
          heding="My fly Cards"
          text="Here you can find your fly cards"
        />
        <div className="container">
          <Link to="/create-card">
            <span className="btn btn-primary">Create a new Card fly</span>
          </Link>

          <Cards
            cards={cards}
            handleDelete={this.handleDelete}
            changeLikeStatus={this.changeLikeStatus}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default MyCards;
