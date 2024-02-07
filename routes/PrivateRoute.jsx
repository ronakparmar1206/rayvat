import { Navigate } from "react-router-dom";

let isAuthenticated = localStorage.getItem("token") ? true : false;
const PrivateRoute = ({ children }) => {
  return isAuthenticated ? [children] : <Navigate to="/login" />;
};
export default PrivateRoute;
