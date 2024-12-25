const Footer = () => {
  return (
    <footer className=" text-gray-800 py-10 w-11/12 mx-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="text-red-600 text-2xl font-bold">Carola</div>
          </div>
          <p>57 Heol Isaf Station Road, Cardiff, UK</p>
          <p className="mt-2">info@example.com</p>
          <p className="mt-2">029-2021-4012</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-red-600">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600">
                Our Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4">Community</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-red-600">
                Area Details
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600">
                Blog Grid
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600">
                Service Areas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600">
                Testimonials
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4">Subscribe Newsletter</h4>
          <p className="mb-4 text-gray-600">
            Our estimated global carbon emissions by investing in greenhouse.
          </p>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <button className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-10 pt-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            Copyright © 2024 <span className="text-red-600">Carola</span>, Inc.
            All Rights Reserved
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-red-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
