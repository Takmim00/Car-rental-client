import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home";
import AvailableCars from "../pages/AvailableCars";
import AddCar from "../pages/AddCar";
import MyCar from "../pages/MyCar";
import MyBooking from "../pages/MyBooking";
import UpdateCar from "../pages/UpdateCar";
import CarDetails from "../pages/CarDetails";
import PrivateRoute from "./PrivateRoute";
import Error from "../component/Error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<Error/>,
    children: [
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/availableCar',
        element:<AvailableCars></AvailableCars>
      },
      {
        path:'/addCar',
        element:<PrivateRoute>
          <AddCar></AddCar>
        </PrivateRoute>
      },
      {
        path:'/myCar',
        element:<PrivateRoute><MyCar></MyCar></PrivateRoute>
      },
      {
        path:'/myBooking',
        element:<PrivateRoute><MyBooking></MyBooking></PrivateRoute>
      },
      {
        path:'/updateCar/:id',
        element:<UpdateCar></UpdateCar>,
        
      },
      {
        path: '/carDetails/:id',
        element: <PrivateRoute><CarDetails></CarDetails></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ],
  },
]);

export default router;
