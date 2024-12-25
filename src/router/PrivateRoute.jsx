import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../provider/AuthProvider";


const PrivateRoute = ({ children }) => {
  const { user ,loading} = useContext(authContext);
  const location = useLocation();

  if(loading){
    return <div className="flex items-center justify-center"><span className="loading loading-bars loading-lg"></span></div>
}

  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
