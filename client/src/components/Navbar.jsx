import { Link, useNavigate } from "react-router-dom";
import { ListTodo, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, logoutUser } from "@/lib/user.axios";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function Navbar() {
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
    retry: false,
  });

  const user = data?.user;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [mobileOpen, setMobileOpen] = useState(false);

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
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ListTodo className="h-6 w-6" />
          <span className="text-lg font-bold">TaskTracker</span>
        </Link>

        {/* Desktop Nav */}
        {user && (
          <nav className="hidden md:flex items-center gap-6">
            <Link className="hover:text-primary" to="/dashboard">
              Dashboard
            </Link>
            <Link className="hover:text-primary" to="/tasks">
              Tasks
            </Link>
          </nav>
        )}

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <Loading compact message="Loading..." />
          ) : !user ? (
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
              <Button onClick={handleLogout} variant="outline">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-4">
          {isLoading ? (
            <Loading compact message="Loading..." />
          ) : user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                Dashboard
              </Link>

              <Link
                to="/tasks"
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                Tasks
              </Link>

              <Link
                to="/user/profile"
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                Profile
              </Link>

              <Link
                to="/createTask"
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                Create Task
              </Link>

              <Button
                onClick={handleLogout}
                className="w-full bg-red-800"
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="w-full" variant="outline">
                <Link to="/user/login" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
              </Button>

              <Button asChild className="w-full">
                <Link to="/user/register" onClick={() => setMobileOpen(false)}>
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
}