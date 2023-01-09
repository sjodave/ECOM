import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import SignIn from "../pages/Signin.page";
import { isLogin } from "../utils/Auth/authChecker";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  // console.log(isLogin());
  // return (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       isLogin() ? <Component {...props} /> : <Navigate to="/signin" />
  //     }
  //   />
  if (isLogin()) return <Outlet />; // or loading indicator, etc...
  return <Navigate to={"/signin"} replace />;
};

export default PrivateRoute;
