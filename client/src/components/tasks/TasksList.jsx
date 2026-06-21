import { completeTask, deleteTask, getTasks, markTaskIncomplete } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { TaskCard } from "./TasksCard";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Home } from "lucide-react";

const TasksList = () => {
  const [params] = useSearchParams();
  const status = params.get("status") || "all";
  const queryClient = useQueryClient();

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
      toast.success("Task Marked As Completed");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const incompleteMutation = useMutation({
    mutationFn: (id) => markTaskIncomplete(id),
    onSuccess: () =>{
      toast.success("Task Marked As Incomplete")
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  })

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  const handleComplete = (id) => {
    completeMutation.mutate(id);
  };
  const handleIncomplete = (id) =>{
    console.log(id)
    incompleteMutation.mutate(id)
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Your Tasks</h1>
        <div className="flex mb-5 gap-3">
          <Link to="/">
            <Button>
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>

          <Link to="/createTask">
            <Button>Create Task</Button>
          </Link>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {getTasksQuery?.data?.status_tasks.length === 0 ? (
            <div className="flex gap-2 font-extrabold font-2xl" >
              <p>No</p>
              <span>{status.toUpperCase()}</span>
              <p>Tasks Found</p>
            </div>
          ) : (
            getTasksQuery?.data?.status_tasks?.map((task) => (
              <li key={task._id}>
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
      </div>
    </div>
  );
};

export default TasksList;
