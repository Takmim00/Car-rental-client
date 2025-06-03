import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Main = () => {
  return (
    <div>
      <div className='sticky top-0 z-50 backdrop-blur-2xl border-b border-b-red-400'> 
      <Navbar></Navbar>
      </div>
      <div className="min-h-[calc(100vh-432px)]">
        <Outlet></Outlet>
      </div>
      <div className="bg-base-200">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
