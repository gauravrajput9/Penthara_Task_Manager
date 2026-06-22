import TasksStatusCards from "./dashboard-components/TasksStatusCards";
import StatusCard from "./dashboard-components/StatusCard";
import PriorityCard from "./dashboard-components/PriorityCard";
import RecentTasks from "./dashboard-components/RecentTasks";
import { Button } from "./ui/button";
import { getTasks } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Dashboard = () => {
     const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const tasks = data?.status_tasks || [];
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <div className="mb-12">
          <span className="rounded-full border px-4 py-1 text-sm text-muted-foreground">
            Dashboard Overview
          </span>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
            Welcome Back 👋
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
           <Link to="/createTask"> <Button>Create Task</Button></Link>
            <Link to="/tasks" ><Button variant="outline">View Tasks</Button></Link>
            <Link to="/dashboard" ><Button variant="outline">Dashboard</Button></Link>
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
