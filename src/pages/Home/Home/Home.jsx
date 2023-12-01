import { Helmet } from "react-helmet-async";
import Container from "../../../component/Container";
import Banner from "../Banner/Banner";
import OurFeatures from "../OurFeatures/OurFeatures";
import States from "../States/States";
import TopRiders from "../TopRiders/TopRiders";

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
        <TopRiders />
      </Container>
    </main>
  );
};

export default Home;
