import PropTypes from "prop-types";

const CardBody = ({ card }) => {
  const { addressLaunch, bizNumber, phone, _id } = card;
  return (
    <div className="card-body p-2">
      <div>
        <strong>Tel: </strong>
        {phone}
      </div>
      <div>
        <strong>Address: </strong>
        {addressLaunch}
      </div>
      <div>
        <strong>Card Number: </strong>
        {bizNumber}
      </div>
    </div>
  );
};

CardBody.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardBody;
