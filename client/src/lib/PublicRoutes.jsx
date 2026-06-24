import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/user.axios";
import Loading from "@/components/Loading";

const PublicRoute = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
    retry: false,
  });

  if (isLoading) {
    return <Loading message="Checking your session..." />;
  }

  if (data?.user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
