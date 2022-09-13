import PropTypes from "prop-types";

const CardTable = ({ cards }) => {
  return (
    <table className="table ">
      <thead>
        <tr>
          <th>num.</th>
          <th>title</th>
          <th>description</th>
          <th>phone</th>
          <th>addressLaunch</th>
          <th>number</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card, i) => {
          const { title, description, phone, addressLaunch, bizNumber } = card;
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{title}</td>
              <td>{description}</td>
              <td>{phone}</td>
              <td>{addressLaunch}</td>
              <td>{bizNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CardTable.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default CardTable;
