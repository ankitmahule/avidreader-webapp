import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth);
  if (!userToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
