import PropTypes from "prop-types";
import Cards from "../../Cards/Cards";
import CardTable from "../../Cards/CardTable";

const DisplayModes = ({ cards, display, changeLikeStatus, handleDelete }) => {
  if (!cards.length) return <div>No Cards In The Database...</div>;
  if (display === "table") return <CardTable cards={cards} />;
  if (display === "cards")
    return (
      <Cards
        cards={cards}
        changeLikeStatus={changeLikeStatus}
        handleDelete={handleDelete}
      />
    );
};

DisplayModes.propTypes = {
  cards: PropTypes.array.isRequired,
  display: PropTypes.string.isRequired,
  changeLikeStatus: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DisplayModes;
