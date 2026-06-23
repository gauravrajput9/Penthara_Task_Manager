import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask, getTaskById, updateTask } from "@/lib/tasks.axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const CreateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [completeTask, setCompleteTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const { data: task } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!task) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleteTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate?.split("T")[0] || "",
    });
  }, [task]);

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success("Created Task Successfully");
      navigate("/tasks");
    },
    onError: (error) => {
      toast.error(error.message || "Cannot create task");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      navigate("/tasks");
      toast.success("Task Updated Successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Cannot update task");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      updateTaskMutation.mutate({ id, taskData: completeTask });
    } else {
      createTaskMutation.mutate(completeTask);
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {isEditMode ? "Edit Task" : "Create A New Task"}
          </h1>

          <p className="mt-3 text-muted-foreground">
            Organize your work, set priorities, and stay productive.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>

                <Input
                  placeholder="Enter the New Task..."
                  value={completeTask.title}
                  onChange={(e) =>
                    setCompleteTask({
                      ...completeTask,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>

                <Textarea
                  className="min-h-40"
                  placeholder="Enter Your Task Description..."
                  value={completeTask.description}
                  onChange={(e) =>
                    setCompleteTask({
                      ...completeTask,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>

                  <Select
                    value={completeTask.priority}
                    onValueChange={(value) =>
                      setCompleteTask({
                        ...completeTask,
                        priority: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>

                  <Input
                    type="date"
                    value={completeTask.dueDate}
                    onChange={(e) =>
                      setCompleteTask({
                        ...completeTask,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={
                  createTaskMutation.isPending || updateTaskMutation.isPending
                }
              >
                {isEditMode ? (
                  updateTaskMutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    "Update Task"
                  )
                ) : createTaskMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="sticky top-6 rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Filter Tasks</h2>

              <div className="flex flex-col gap-3">
                <Link to="/tasks?status=all">
                  <Button variant="outline" className="w-full justify-start">
                    All Tasks
                  </Button>
                </Link>

                <Link to="/tasks?status=completed">
                  <Button variant="outline" className="w-full justify-start">
                    Completed
                  </Button>
                </Link>

                <Link to="/tasks?status=pending">
                  <Button variant="outline" className="w-full justify-start">
                    Pending
                  </Button>
                </Link>
              </div>
            </div>

            <Link to="/tasks">
              <Button className="w-full">View All Tasks</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
