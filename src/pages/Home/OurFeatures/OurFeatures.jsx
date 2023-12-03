import SectionTitle from "../../../component/SectionTitle";
import FeatureCard from "./FeatureCard";
import sameDayImg from "./same-day-delivery-sm.png";
import parcelSafetyImg from "./delivery-icon-sm.png";
import homeDeliveryImg from "./Home-delivery-sm.png";

const OurFeatures = () => {
  const ourFeatures = [
    {
      _id: "abc",
      img: sameDayImg,
      title: "Express Delivery",
      description:
        "Enjoy same day delivery from us in express delivery option.",
    },
    {
      _id: "bcd",
      img: parcelSafetyImg,
      title: "Parcel Safety",
      description:
        "Be relaxed while we deliver. We ensure 100% safety of your product.",
    },
    {
      _id: "cde",
      img: homeDeliveryImg,
      title: "Home Delivery",
      description:
        "Receive your parcel at your dore-step. No need to wait in line.",
    },
  ];
  return (
    <section>
      <SectionTitle heading="Our Features" subHeading="Why Choose Us" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ourFeatures.map((feature, idx) => (
          <FeatureCard key={feature._id} feature={feature} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default OurFeatures;
