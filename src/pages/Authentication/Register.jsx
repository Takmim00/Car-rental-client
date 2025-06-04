import {
  Car,
  CheckCircle,
  Eye,
  EyeOff,
  ImageIcon,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import register from "../../assets/registerr.jpg";
import { authContext } from "../../provider/AuthProvider";
const Register = () => {
  const { setUser, createNewUser, handleGoogleLogin, updateUserProfile } =
    useContext(authContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      toast.error(
        "Password must contain at least one lowercase and one uppercase letter."
      );
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        updateUserProfile(name, photo)
          .then(() => {
            const updatedUser = {
              ...result.user,
              displayName: name,
              photoURL: photo,
            };
            setUser(updatedUser);
            toast.success("Registration successful! Redirecting to home...");
            navigate("/");
            console.log(updatedUser);
          })
          .catch((err) => {
            toast.error("Profile update failed: " + err.message);
          });
      })
      .catch((error) => {
        const errorMessage =
          error.message || "An error occurred during registration";
        toast.error(errorMessage);
      });
  };

  const googleLogIngHandler = () => {
    handleGoogleLogin().then((res) => {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Section - Registration Form */}
        <div className="flex items-center justify-center p-4 order-2 lg:order-1">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              {/* Mobile brand header */}
              <div className="lg:hidden flex items-center justify-center space-x-2 mb-6">
                <div className="bg-red-600 p-2 rounded-full text-white shadow-md">
                  <Car size={24} />
                </div>
                <span className="text-2xl font-bold text-red-600">
                  CarRental
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Join us and start your car rental journey
              </p>
            </div>

            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 flex items-center space-x-1"
                  >
                    <span>Full Name</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200"
                      size={16}
                    />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="photo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Photo URL
                  </label>
                  <div className="relative group">
                    <ImageIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200"
                      size={16}
                    />
                    <input
                      id="photo"
                      name="photo"
                      type="url"
                      placeholder="Enter photo URL (optional)"
                      className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 flex items-center space-x-1"
                  >
                    <span>Email Address</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200"
                      size={16}
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 flex items-center space-x-1"
                  >
                    <span>Password</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200"
                      size={16}
                    />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full h-12 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-2 py-2">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2 mt-0.5"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none text-lg mt-2 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-gray-500">
                    Or register with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={googleLogIngHandler}
                className="w-full h-12 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition-colors duration-200 flex items-center justify-center space-x-3 shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8 space-y-8 order-1 lg:order-2">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-red-600 p-3 rounded-full text-white shadow-lg shadow-red-200">
                <Car size={32} strokeWidth={2} />
              </div>
              <h1 className="text-4xl font-bold text-red-600">CarRental</h1>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Join Our Community!
              </h2>
              <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                Create your account and get access to premium car rentals with
                exclusive member benefits.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 text-left max-w-sm">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">
                  Exclusive member discounts
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">Priority booking access</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">24/7 customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-gray-700">Free cancellation policy</span>
              </div>
            </div>
          </div>

          {/* Car illustration */}
          <div className="relative w-full max-w-md">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-red-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-red-500 rounded-full opacity-20 animate-pulse delay-300"></div>

            <img
              src={register}
              alt="Car rental illustration"
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
