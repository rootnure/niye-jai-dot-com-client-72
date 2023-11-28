import PropTypes from "prop-types";

const FeatureCard = ({ feature }) => {
  const { img, title, description } = feature;
  return (
    <div
      data-aos="fade-up"
      className="card card-compact bg-my-primary bg-opacity-5 border border-my-primary hover:scale-105 transition-all duration-100">
      <figure className={`h-72 ${title.includes("Safety") ? "p-6" : ""}`}>
        <img src={img} alt={title} className="h-full" />
      </figure>
      <div className="text-center card-body mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-base text-gray-500 mt-2">{description}</p>
      </div>
    </div>
  );
};

FeatureCard.propTypes = {
  feature: PropTypes.object.isRequired,
};

export default FeatureCard;
