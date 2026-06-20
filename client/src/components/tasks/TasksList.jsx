import { completeTask, deleteTask, getTasks } from "@/lib/axios";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { TaskCard } from "./TasksCard";
import { toast } from "react-toastify";



const TasksList = () => {
  const [params] = useSearchParams();
  const status = params.get("status") || "all";
  const queryClient = useQueryClient()

  const getTasksQuery = useQuery({
    queryKey: ["tasks", status],
    queryFn: () => getTasks(status),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTask(id),
    onError: (error) => {
      console.log("Delete TAsk Mutation Error: ", error);
      toast.error(error.message || "Cannot Delete Task");
    },
    onSuccess: () => {
      toast.success("Task Deleted");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const completeMutation = useMutation({
    mutationFn: (id) => completeTask(id),
    onError: (error) => {
      console.log("Complete Task Mutation Error: ", error);
      toast.error(error.message || "Cannot Delete Task");
    },
    onSuccess: () => {
      toast.success("Task MArked As Completed");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  const handleComplete = (id) => {
    completeMutation.mutate(id);
  };

  return (
  <div className="min-h-screen w-full bg-zinc-950 text-white px-4 py-8">
    <div className="mx-auto max-w-5xl">
      
      <h1 className="text-3xl font-bold mb-6 tracking-tight">
        Your Tasks
      </h1>

      <ul className="grid gap-5 sm:grid-cols-2">
        {getTasksQuery?.data?.status_tasks?.map((task) => (
          <li key={task._id}>
            <TaskCard
              task={task}
              completeMutation={completeMutation}
              deleteMutation={deleteMutation}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>

    </div>
  </div>
);
};

export default TasksList;
