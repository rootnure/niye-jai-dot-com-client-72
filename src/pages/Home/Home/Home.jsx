import { Helmet } from "react-helmet-async";
import Container from "../../../component/Container";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>NiyeJai | Home</title>
      </Helmet>
      <div>banner</div>
      <Container>
        <div>featured</div>
        <div>services</div>
        <div>top rider</div>
      </Container>
    </main>
  );
};

export default Home;
