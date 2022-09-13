import PropTypes from "prop-types";

const CardInfo = ({ title, description }) => {
  return (
    <p className="mb-1">
      <strong>{title}: </strong>
      {description}
    </p>
  );
};

CardInfo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default CardInfo;
