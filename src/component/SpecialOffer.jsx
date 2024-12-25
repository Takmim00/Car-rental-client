import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
const SpecialOffer = () => {
    useEffect(()=>{
        Aos.init();
    },[])
  return (
    <section className="py-8  w-11/12 mx-auto">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Offer 1 */}
          <div data-aos="fade-right" className="relative bg-blue-500 text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="relative p-6">
              <h3 className="text-xl font-semibold">
                Get 15% off for weekend rentals!
              </h3>
              <p className="mt-2">Book your weekend rental now and save big!</p>
              <button className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Offer 2 */}
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            className="relative bg-red-500 text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="relative p-6">
              <h3 className="text-xl font-semibold">
                Luxury cars at $99/day this holiday season!
              </h3>
              <p className="mt-2">
                Drive in style this season at an amazing price!
              </p>
              <button className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition duration-200">
                Book Now
              </button>
            </div>
          </div>

          {/* Offer 3 */}
          <div data-aos="fade-right" className="relative bg-green-500 text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="relative p-6 ">
              <h3 className="text-xl font-semibold">
                Exclusive discounts for members!
              </h3>
              <p className="mt-2">
                Join our membership for exclusive offers and perks.
              </p>
              <button className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
