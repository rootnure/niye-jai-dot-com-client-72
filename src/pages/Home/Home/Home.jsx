import { Helmet } from "react-helmet-async";
import Container from "../../../component/Container";
import Banner from "../Banner/Banner";
import OurFeatures from "../OurFeatures/OurFeatures";
import States from "../States/States";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>NiyeJai | Home</title>
      </Helmet>
      <Banner />
      <Container className="my-16 space-y-12">
        <OurFeatures />
        <States />
        <div className="bg-gray-300">top rider</div>
      </Container>
    </main>
  );
};

export default Home;
