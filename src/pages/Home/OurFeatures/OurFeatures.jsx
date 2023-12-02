import SectionTitle from "../../../component/SectionTitle";
import FeatureCard from "./FeatureCard";

const OurFeatures = () => {
  const ourFeatures = [
    {
      _id: "abc",
      img: "https://i.ibb.co/Xs1NW1h/Same-day-delivery.png",
      title: "Express Delivery",
      description:
        "Enjoy same day delivery from us in express delivery option.",
    },
    {
      _id: "bcd",
      img: "https://i.ibb.co/GHnptGT/delivery-icon.png",
      title: "Parcel Safety",
      description:
        "Be relaxed while we deliver. We ensure 100% safety of your product.",
    },
    {
      _id: "cde",
      img: "https://i.ibb.co/4p1H0nN/Home-delivery.png",
      title: "Home Delivery",
      description:
        "Receive your parcel at your dore-step. No need to wait in line.",
    },
  ];
  return (
    <section>
      <SectionTitle heading="Our Features" subHeading="Why Us" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ourFeatures.map((feature, idx) => (
          <FeatureCard key={feature._id} feature={feature} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default OurFeatures;
