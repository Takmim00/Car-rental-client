import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { authContext } from "../../provider/AuthProvider";


const Login = () => {
    const { userLogin, handleGoogleLogin, handleGithubLogin } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((res) => {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
        toast.success("Login successful!");
      })
      .catch((err) => {
        if (err.code) {
          toast.error("No account found with this email. Please register.");
        }
      });
  };
  const googleLogIngHandler = () => {
    handleGoogleLogin().then((res) => {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    });
  };
  const githubLogIngHandler = () => {
    handleGithubLogin().then((res) => {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    });
  };
  const handleForgotPassword = () => {
    const email = document.querySelector("input[name='email']").value;
    navigate("/forgetPassword", { state: { email } });
  };
    return (
        <div>
      
      <ToastContainer />
      <div className=" flex justify-center items-center ">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10 border-2">
          <h2 className="text-2xl font-semibold text-center">
            Login your account
          </h2>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <Link
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-3 bottom-11"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </Link>
              <label className="label">
                <Link
                  to="/forgetPassword"
                  onClick={handleForgotPassword}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary font-semibold text-xl rounded-md">Login</button>
            </div>
          </form>
          <div className=" items-center flex justify-center mb-4">
            <button
              onClick={googleLogIngHandler}
              className="btn text-xl  rounded-lg"
            >
              <FaGoogle />
              Google
            </button>
            <button
            onClick={githubLogIngHandler}
            className="btn text-xl  rounded-lg "
          >
            <FaGithub />
            GitHub
          </button>
          </div>
          <p className="text-center font-semibold">
            Don’t Have An Account ?{" "}
            <Link to="/register" className="text-red-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
};

export default Login;