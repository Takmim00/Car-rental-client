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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
        element:<AddCar></AddCar>
      },
      {
        path:'/myCar',
        element:<MyCar></MyCar>
      },
      {
        path:'/myBooking',
        element:<MyBooking></MyBooking>
      },
      {
        path:'/updateCar/:id',
        element:<UpdateCar></UpdateCar>,
        
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
