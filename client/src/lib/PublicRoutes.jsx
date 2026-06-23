import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/user.axios";

const PublicRoute = ({ children }) => {

  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
    retry: false,
  });

  if (!isLoading && data?.user) {
    return <Navigate to={`/`} replace />;
  }

  return children;
};

export default PublicRoute;
