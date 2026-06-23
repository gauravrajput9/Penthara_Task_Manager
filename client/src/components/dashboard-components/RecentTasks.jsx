import { formatDistanceToNow } from "date-fns";
import { TaskCard } from "../tasks/TasksCard";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  completeTask,
  deleteTask,
  markTaskIncomplete,
} from "@/lib/tasks.axios";

const RecentTasks = ({ tasks  }) => {
  console.log("Recent tasks: ",tasks)
  const queryClient = useQueryClient();

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

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="mx-auto mt-12 max-w-5xl">
      {/* Section Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Recently Created Tasks 
        </h2>

        <p className="mt-2 text-muted-foreground">
          Your latest tasks sorted by creation date.
        </p>
      </div>

      {/* Empty State */}
      {recentTasks.length === 0 ? (
        <div className="rounded-xl border border-dashed py-12 text-center">
          <h3 className="text-xl font-semibold">
            No Tasks Yet
          </h3>

          <p className="mt-2 text-muted-foreground">
            Create a task to start tracking your work.
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {recentTasks.map((task) => (
            <li
              key={task._id}
              className="rounded-xl border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Created{" "}
                  {formatDistanceToNow(
                    new Date(task.createdAt),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority.toUpperCase()}
                </span>
              </div>

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
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTasks;