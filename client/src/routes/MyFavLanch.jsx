import React from "react";
import HeroImg from "../component/HeroImg";
import { getfavCards } from "../services/cardService";
import CardExtends from "../Cards/CardExtend";
//import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import FavoriteCards from "../Cards/FavCards";
import Footer from "../component/footer";
import Navbar from "../component/navbar/Navbar";
import { getCurrentUser } from "../services/userServices";

const user = getCurrentUser();

class MyFavLanch extends CardExtends {
  state = {
    data: [],
    cards: [],
    isMounted: false,
  };

  async componentDidMount() {
    try {
      const { data } = await getfavCards();
      this.setState({ data, cards: data, isMounted: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const cards = [...this.state.cards];

    if (!user) return <Navigate to="/" />;
    // if (!isMounted) return <Loader />;

    return (
      <React.Fragment>
        <Navbar />
        <HeroImg
          heading="My favorite cards"
          text="Here you can find your favorite business cards"
        />

        <div className="container">
          <FavoriteCards
            cards={cards}
            user={user}
            changeLikeStatus={this.changeLikeStatus}
            handleDelete={this.handleDelete}
          />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default MyFavLanch;
