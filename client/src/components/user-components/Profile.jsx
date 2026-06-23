import { getUser } from "@/lib/user.axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { getTasks } from "@/lib/tasks.axios";
import TasksStatusCards from "../dashboard-components/TasksStatusCards";
import { Link } from "react-router-dom";

const Profile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser,
  });

  const fetchTasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const tasks = fetchTasksQuery.data?.status_tasks || [];
  console.log(tasks)

  if (isLoading || fetchTasksQuery.isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        message={fetchTasksQuery.error?.message || "Failed to load tasks"}
        onRetry={() => fetchTasksQuery.refetch()}
      />
    );
  }

  const user = data?.user;

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* PROFILE HEADER */}
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between w-full">
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
              {/* Avatar */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* User Info */}
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-muted-foreground">{user?.email}</p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    Task Manager User
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    Active Account
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - CTA */}
            <div className="flex gap-3">
              <Link to="/createTask">
                <button className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90">
                  + Create Task
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <h2 className="mt-2 text-2xl font-bold">{tasks.length}</h2>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Completed</p>
            <h2 className="mt-2 text-2xl font-bold text-green-600">
              {tasks.filter((t) => t.completed).length}
            </h2>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Pending</p>
            <h2 className="mt-2 text-2xl font-bold text-orange-500">
              {tasks.filter((t) => !t.completed).length}
            </h2>
          </div>
        </div>

        {/* TASK ANALYTICS */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Task Analytics</h2>

          <TasksStatusCards tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
