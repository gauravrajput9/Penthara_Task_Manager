import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/user.axios";
import Loading from "@/components/Loading";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
    retry: false,
  });

  if (isLoading) {
    return <Loading message="Checking your session..." />;
  }

  if (isError || !data?.user) {
    return <Navigate to="/user/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
