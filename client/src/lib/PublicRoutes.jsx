import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/user.axios";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const from = location.state?.from;
  const redirectTo = from ? `${from.pathname}${from.search}` : "/dashboard";

  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
    retry: false,
  });

  if (!isLoading && data?.user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PublicRoute;
