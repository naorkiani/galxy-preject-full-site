import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const CardControllers = ({ card, user, handleDelete, changeLikeStatus }) => {
  const cardLikes = card.likes;
  let isCardLiked = null;

  if (user && cardLikes.length)
    isCardLiked = cardLikes.find((id) => id === user._id);

  return (
    <div className="justify-content-between d-flex px-2 pb-2">
      {(user && user.id === card.user_id) || user.isAdmin ? (
        <div>
          <span className="cursor" onClick={() => handleDelete(card._id)}>
            Delete |
          </span>
          <Link className="text-dark" to={`/edit-card/${card._id}`}>
            <span className="cursor">Edit</span>
          </Link>
        </div>
      ) : null}

      {user && (
        <div>
          {cardLikes.length}
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={isCardLiked ? "text-primary" : "text-secondary"}
            onClick={() => changeLikeStatus(card._id, user)}
          />
        </div>
      )}
    </div>
  );
};

CardControllers.propTypes = {
  card: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeLikeStatus: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default CardControllers;
