import PropTypes from "prop-types";

const CardDetailsHeader = ({ title, flight }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{flight}</p>
      <hr />
    </>
  );
};

CardDetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default CardDetailsHeader;
