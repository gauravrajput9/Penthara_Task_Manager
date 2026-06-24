import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/user.axios";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
    retry: false,
  });

  if (isLoading) {
    return <Loading message="Checking your session..." />;
  }

  if (isError) {
    const isUnauthorized = error?.message
      ?.toLowerCase()
      .includes("unauthorized");

    if (isUnauthorized) {
      return <Navigate to="/user/login" replace state={{ from: location }} />;
    }

    return (
      <Error
        message={error?.message || "Failed to verify session"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!data?.user) {
    return <Navigate to="/user/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
