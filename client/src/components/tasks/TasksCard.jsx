import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export function TaskCard({ task, onDelete, onComplete }) {
  const navigate = useNavigate();
  if (!task) return null;

  return (
    <Card className="w-full bg-zinc-900 border border-zinc-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          {task.title}
        </CardTitle>

        <CardDescription className="text-zinc-400">
          {task.description}
        </CardDescription>

        <div className="flex gap-2 mt-3">
          <Badge className="bg-zinc-800 text-zinc-300 border border-zinc-700">
            {task.priority.toUpperCase()}
          </Badge>

          <Badge
            className={
              task.status === "completed"
                ? "bg-green-600 text-white"
                : "bg-yellow-600 text-black"
            }
          >
            {task.completed === true ? "Completed" : "pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-zinc-400">
          Due Date:{" "}
          <span className="text-zinc-200">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </p>
      </CardContent>

      <CardFooter className="flex justify-between gap-3">
        <Button
          variant="outline"
          className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </Button>

        {task.status !== "completed" && (
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => onComplete(task._id)}
          >
            Mark Done
          </Button>
        )}
        <Button onClick={() => navigate(`/tasks/edit/${task._id}`)}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
