import { FaCalendarAlt, FaCar } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FcCustomerSupport } from "react-icons/fc";

const WhyChooseUs = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
          <p className="text-lg mt-2">
            Highlight your platform unique selling points to build trust and
            draw user interest.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1*/}
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-4">
              <FaCar />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Variety of Cars</h3>
            <p className="text-sm">
              From budget-friendly options to luxury vehicles.
            </p>
          </div>

          {/* Card 2*/}
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-4">
              <FaDollarSign/>
            </div>
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-sm">Competitive daily rates you can count on.</p>
          </div>

          {/* Card 3*/}
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-4">
              <FaCalendarAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Booking Process</h3>
            <p className="text-sm">
              Seamlessly book your ride in just a few clicks.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-4">
              <FcCustomerSupport/>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p className="text-sm">24/7 assistance for all your queries.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
