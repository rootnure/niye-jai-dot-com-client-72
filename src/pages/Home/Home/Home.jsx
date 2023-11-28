import { Helmet } from "react-helmet-async";
import Container from "../../../component/Container";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>NiyeJai | Home</title>
      </Helmet>
      <Banner />
      <Container className="my-16">
        <div className="bg-red-300">featured</div>
        <div className="bg-amber-300">services</div>
        <div className="bg-gray-300">top rider</div>
      </Container>
    </main>
  );
};

export default Home;
