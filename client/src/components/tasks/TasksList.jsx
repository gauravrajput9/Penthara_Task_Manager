import {
  completeTask,
  deleteTask,
  getTasks,
  markTaskIncomplete,
} from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { TaskCard } from "./TasksCard";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Home } from "lucide-react";
import TaskSearch from "../TaskSearch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TasksList = () => {
  const [params] = useSearchParams();
  const status = params.get("status") || "all";

  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  console.log(priority)

  const getTasksQuery = useQuery({
    queryKey: ["tasks", status],
    queryFn: () => getTasks(status),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task Deleted");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message || "Cannot Delete Task");
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      toast.success("Task Marked As Completed");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error.message || "Cannot Complete Task");
    },
  });

  const incompleteMutation = useMutation({
    mutationFn: markTaskIncomplete,
    onSuccess: () => {
      toast.success("Task Marked As Incomplete");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleComplete = (id) => {
    completeMutation.mutate(id);
  };

  const handleIncomplete = (id) => {
    incompleteMutation.mutate(id);
  };

  const tasks = getTasksQuery.data?.status_tasks || [];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPriority = priority === "all" || task.priority === priority;

    return matchesSearch && matchesPriority;
  });

  if (getTasksQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium">Loading Tasks...</p>
      </div>
    );
  }

  if (getTasksQuery.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">Failed to load tasks.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Your Tasks</h1>

            <p className="mt-1 text-muted-foreground">
              Manage, filter and organize your tasks.
            </p>
          </div>

          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>

            <Link to="/createTask">
              <Button>Create Task</Button>
            </Link>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside>
            <div className="sticky top-5 rounded-xl border bg-card p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold">Search & Filters</h2>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Search Tasks
                  </label>

                  <TaskSearch search={search} setSearch={setSearch} />
                </div>

                {/* Priority Filter Placeholder */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Priority
                  </label>

                  <div className="rounded-lg border p-3 text-sm text-muted-foreground">
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Status Filter Placeholder */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Status
                  </label>

                  <div className="rounded-lg border p-3 text-sm text-muted-foreground">
                    Status filter coming soon
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Tasks Section */}
          <section>
            <div className="mb-5 flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold">Tasks</h2>

                <p className="text-sm text-muted-foreground">
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </p>
              </div>

              <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {priority.toUpperCase()}
              </div>
            </div>

            <ul className="grid gap-5 md:grid-cols-2">
              {filteredTasks.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
                  <h3 className="text-xl font-semibold">
                    {search
                      ? `No tasks found for "${search}"`
                      : `No ${status} tasks found`}
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    {search
                      ? "Try another search keyword."
                      : "Create a new task to get started."}
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <li
                    key={task._id}
                    className="transition-all duration-200 hover:-translate-y-1"
                  >
                    <TaskCard
                      task={task}
                      completeMutation={completeMutation}
                      deleteMutation={deleteMutation}
                      incompleteMutation={incompleteMutation}
                      onComplete={handleComplete}
                      onIncomplete={handleIncomplete}
                      onDelete={handleDelete}
                    />
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TasksList;
