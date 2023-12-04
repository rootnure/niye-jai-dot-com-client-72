import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../component/SectionTitle";

const AdminStatistics = () => {
  return (
    <section className="-mt-6 mb-12">
      <Helmet>
        <title>NiyeJai | Admin Stats</title>
      </Helmet>
      <SectionTitle heading="App Summary" subHeading="Usages Statistics" />
      <div>Coming Soon...</div>
    </section>
  );
};

export default AdminStatistics;
