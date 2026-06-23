import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {  useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/lib/user.axios";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const loginMutation = useMutation({
        mutationFn: (data) => loginUser(data),
        onSuccess: (data) =>{
            queryClient.setQueryData(["authUser"], data);
            toast.success(data.message || "Login Successful")
            navigate("/");
        }
    })
    const handleLogin = (e) =>{
        e.preventDefault()
        loginMutation.mutate(user);
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/30 px-4">
      <Card className="w-full max-w-md shadow-xl border">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Welcome Back 
          </CardTitle>

          <CardDescription>
            Login to manage your tasks and stay productive.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleLogin} >
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={(e) =>{
                    setUser({
                        ...user,
                        email: e.target.value
                    })
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                placeholder="••••••••"
                value={user.password}
                onChange={(e) =>{
                    setUser({
                        ...user,
                        password: e.target.value
                    })
                }}
              />
            </div>

            <Button className="w-full" type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/user/register"
                className="font-medium text-primary hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
