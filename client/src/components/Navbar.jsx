import { Link, useNavigate } from "react-router-dom";
import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, logoutUser } from "@/lib/user.axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const { data } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
    retry: false,
  });

  const user = data?.user;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.removeQueries({ queryKey: ["authUser"] });
      navigate("/user/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ListTodo className="h-6 w-6" />
          <span className="text-lg font-bold">TaskTracker</span>
        </Link>

        {/* Nav Links */}
        {user && (
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/dashboard"
              className="font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>

            <Link
              to="/tasks"
              className="font-medium transition-colors hover:text-primary"
            >
              Tasks
            </Link>
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/user/login">Login</Link>
              </Button>

              <Button asChild>
                <Link to="/user/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handleLogout()}
                variant="outline"
                className="bg-red-800"
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/user/profile">Profile</Link>
              </Button>

              <Button asChild>
                <Link to="/createTask">Create Task</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
