import { TailSpin } from "react-loader-spinner";
import PropTypes from "prop-types";

const Loader = ({ width = 200, color = "#00BFFF" }) => {
  return (
    <div style={{ minHeight: "85vh" }} className="center">
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
};

Loader.propTypes = {
  width: PropTypes.string,
  color: PropTypes.number,
};
export default Loader;
