import PropTypes from "prop-types";

const FeatureCard = ({ feature, idx }) => {
  const { img, title, description } = feature;
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      className={`card card-compact bg-my-primary bg-opacity-5 border border-my-primary group ${
        idx === 2 ? "col-span-2 w-1/2 mx-auto" : ""
      }`}>
      <figure
        className={`h-40 lg:h-72 ${title.includes("Safety") ? "p-6" : ""}`}>
        <img
          src={img}
          alt={title}
          className="h-full group-hover:scale-110 duration-100"
        />
      </figure>
      <div className="text-center card-body mb-2 lg:mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-base text-gray-500 lg:mt-2">{description}</p>
      </div>
    </div>
  );
};

FeatureCard.propTypes = {
  feature: PropTypes.object.isRequired,
  idx: PropTypes.number,
};

export default FeatureCard;
