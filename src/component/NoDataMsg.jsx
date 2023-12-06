import PropTypes from "prop-types";

const NoDataMsg = ({ children }) => {
  return (
    <div className="py-12 prevent-text-select">
      <h2 className="font-semibold text-4xl text-center italic text-gray-300">
        {children}
      </h2>
    </div>
  );
};

NoDataMsg.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoDataMsg;
