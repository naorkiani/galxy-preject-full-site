import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../Cards/cardStyle.css";

const CardHead = ({ card }) => {
  const {
    _id,
    title,
    Flight,
    image: { url, alt },
  } = card;

  return (
    <div className="card-head">
      <Link to={`card-details/${_id}`}>
        <img className="img-fluid" src={url} alt={alt} />
      </Link>
      <div className="p-2">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{Flight}</p>
        <hr className="m-0" />
      </div>
    </div>
  );
};

CardHead.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardHead;
