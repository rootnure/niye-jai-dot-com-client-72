import PropTypes from "prop-types";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="w-fit mx-auto text-center my-12">
      {subHeading && (
        <p className="text-base text-amber-500 my-2">---{subHeading}---</p>
      )}
      <h2 className="text-3xl font-bold border-y-2 border-gray-400 py-2 px-12 uppercase">
        {heading}
      </h2>
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
};

export default SectionTitle;
