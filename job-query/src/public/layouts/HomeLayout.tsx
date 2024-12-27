import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function HomeLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default HomeLayout;
