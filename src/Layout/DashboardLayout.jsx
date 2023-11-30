import { Outlet } from "react-router-dom";
import Container from "../component/Container";
import "./DashboardLayout.css";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Container>
        <main className="flex gap-6">
          <Sidebar />
          <section className="p-12">
            <Outlet />
          </section>
        </main>
      </Container>
    </>
  );
};

export default DashboardLayout;
