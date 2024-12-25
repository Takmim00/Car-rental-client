const FeaturesSection = () => {
  return (
    <div className="bg-white py-16  flex md:flex-row flex-col w-11/12 mx-auto">
      {/* Heading Section */}
      <div className="text-start pl-5">
        <span className="text-sm font-semibold text-red-500 bg-red-100 px-3 py-1 rounded-full uppercase">
          We Are The Best
        </span>
        <h1 className="text-4xl font-bold mt-4 leading-tight">
          Explore The World <br /> With Your Own Way Of Driving
        </h1>
      </div>

      {/* Features */}
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {/* Feature 1 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center w-full md:w-1/3">
          <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 border border-gray-300 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9zm0 0v-9"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-xl">Free Pick Up & Drop</h3>
          <p className="text-gray-500 mt-2">
            Your convenience matters. Complimentary pick-up and drop-off service
            for your vehicle, a stress-free experience.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center w-full md:w-1/3">
          <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 border border-gray-300 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-3-3v6m8 3.75a9.003 9.003 0 01-15.9 0m15.9 0a8.963 8.963 0 00-.968-4.03m-14.934 4.03a9.003 9.003 0 01.968-4.03m14.934 0a8.963 8.963 0 00-.968-4.03m-14.934 4.03a9.003 9.003 0 01.968-4.03M12 3a8.963 8.963 0 014.03.968m-8.06 0A8.963 8.963 0 0112 3"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-xl">24/7 Road Assistant</h3>
          <p className="text-gray-500 mt-2">
            No matter the time or place, our 24/7 roadside assistance ensures
            you're never stranded. Drive confidently with support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
