import TasksStatusCards from "./dashboard-components/TasksStatusCards";
import StatusCard from "./dashboard-components/StatusCard";
import PriorityCard from "./dashboard-components/PriorityCard";
import RecentTasks from "./dashboard-components/RecentTasks";
import { Button } from "./ui/button";
import { getTasks } from "@/lib/tasks.axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUser } from "@/lib/user.axios";
import Loading from "./Loading";
import Error from "./Error";

const Dashboard = () => {
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks("all"),
  });

  const userQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
    retry: false,
  });

  const isLoading = tasksQuery.isLoading || userQuery.isLoading;
  const isError = tasksQuery.isError || userQuery.isError;
  const error = tasksQuery.error || userQuery.error;

  if (isLoading) {
    return <Loading message="Loading dashboard..." />;
  }

  if (isError) {
    return (
      <Error
        message={error?.message || "Failed to load dashboard"}
        onRetry={() => {
          tasksQuery.refetch();
          userQuery.refetch();
        }}
      />
    );
  }

  const userName = userQuery.data?.user?.name || "there";
  const tasks = tasksQuery.data?.status_tasks || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <div className="mb-12">
          <span className="rounded-full border px-4 py-1 text-sm text-muted-foreground">
            Dashboard Overview
          </span>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
            Welcome Back! {userName}
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/createTask">
              <Button>Create Task</Button>
            </Link>
            <Link to="/tasks">
              <Button variant="outline">View Tasks</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link to="/user/profile">
              <Button>View Profile</Button>
            </Link>
          </div>

          <p className="mt-3 text-lg text-muted-foreground">
            Track progress, monitor priorities, and stay productive.
          </p>
        </div>

        {/* Stats */}
        <TasksStatusCards tasks={tasks} />

        {/* Analytics */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <StatusCard />
          <PriorityCard tasks={tasks} />
        </div>

        {/* Recent Tasks */}
        <div className="mt-10">
          <RecentTasks tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
