import { Navigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const ProtectedRoute = ({
  children,
  isLoggedIn,
  //   isAuthSettled,
  setActiveModal,
}) => {
  //   if (!isAuthSettled) {
  //     return <Nav isInverse={true} />;
  //   }

  if (!isLoggedIn) {
    setActiveModal("login");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
