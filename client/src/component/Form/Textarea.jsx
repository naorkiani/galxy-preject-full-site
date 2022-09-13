import PropTypes from "prop-types";

const Textarea = ({ name, label, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea {...rest} name={name} id={name}></textarea>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default Textarea;
