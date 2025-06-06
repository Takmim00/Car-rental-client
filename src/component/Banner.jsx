import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Banner = () => {
  return (
    <div
      className="relative w-full  bg-cover bg-center lg:h-[70vh] flex md:flex-row flex-col items-center justify-between px-10 "
      style={{
        backgroundImage: `url('https://i.ibb.co.com/T1CXCH4/bg-car.jpg')`,
      }}
    >
      <div className="relative z-10 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold  leading-tight">
          Drive Your Dreams Today!
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Fulfill your automotive fantasies without breaking the bank. Check our
          affordable car rentals for an opulent yet economical ride.
        </p>
        <Link to="/availableCar">
          <button className="mt-6 btn bg-red-400 hover:bg-red-500 text-white rounded-full flex justify-center  text-lg font-semibold shadow-md text-center">
            View Available Cars <FaArrowRight />
          </button>
        </Link>
      </div>

      {/* Car Image */}
      <div className="relative z-10 ">
        <img
          src="https://i.ibb.co.com/2v98TRB/car.png"
          alt="Luxury Car"
          className="w-full "
        />
      </div>
    </div>
  );
};

export default Banner;
