import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-443px)]">
        <Outlet></Outlet>
      </div>
      <div className="bg-base-200">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
