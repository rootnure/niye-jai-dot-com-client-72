import { Outlet } from "react-router-dom";
import Container from "../component/Container";
import "./DashboardLayout.css";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Container>
        <main className="flex">
          <Sidebar />
          <section className="p-12 min-h-screen bg-my-primary bg-opacity-5 w-full">
            <Outlet />
          </section>
        </main>
      </Container>
    </>
  );
};

export default DashboardLayout;
