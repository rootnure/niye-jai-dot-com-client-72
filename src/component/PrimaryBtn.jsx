import PropTypes from "prop-types";

const PrimaryBtn = ({ children }) => {
  return (
    <>
      <button className="btn bg-my-primary border-0 text-white text-lg bg-opacity-80 hover:bg-opacity-100 hover:bg-my-primary">
        {children}
      </button>
    </>
  );
};
PrimaryBtn.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrimaryBtn;
