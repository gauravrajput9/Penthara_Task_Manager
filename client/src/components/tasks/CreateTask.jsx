import { useState } from "react";
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
import { Link } from "react-router-dom";

const CreateTask = () => {
  const [completeTask, setCompleteTask] = useState({
    task: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  console.log(completeTask);

  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Create a New Task
          </h1>

          <p className="mt-3 text-muted-foreground">
            Organize your work, set priorities, and stay productive.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>

              <Input
                placeholder="Enter the New Task..."
                value={completeTask.task}
                onChange={(e) =>
                  setCompleteTask({
                    ...completeTask,
                    task: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>

              <Textarea
                className="min-h-32"
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
                    <SelectItem value="low">🟢 Low</SelectItem>

                    <SelectItem value="medium">🟡 Medium</SelectItem>

                    <SelectItem value="high">🔴 High</SelectItem>
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

            <Button type="submit" size="lg" className="w-full">
              Create Task
            </Button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-center text-lg font-semibold">
            Filter Tasks
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/tasks?status=all">
              <Button variant="outline">All</Button>
            </Link>

            <Link to="/tasks?status=completed">
              <Button variant="outline">Completed</Button>
            </Link>

            <Link to="/tasks?status=pending">
              <Button variant="outline">Pending</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
