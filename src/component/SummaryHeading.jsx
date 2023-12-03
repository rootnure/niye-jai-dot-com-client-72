import PropTypes from "prop-types";

const SummaryHeading = ({ children }) => {
  return (
    <div className="h-full flex items-center">
      <h3 className="text-3xl -mt-6 mb-4 font-semibold">{children}</h3>
    </div>
  );
};

SummaryHeading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SummaryHeading;
