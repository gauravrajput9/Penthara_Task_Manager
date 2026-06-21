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
import { CheckCircle2, Loader2, Pencil, Trash2 } from "lucide-react";

export function TaskCard({
  task,
  onDelete,
  onIncomplete,
  incompleteMutation,
  deleteMutation,
  onComplete,
}) {
  const navigate = useNavigate();
  if (!task) return null;

  return (
    <Card className="w-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>

        <CardDescription>{task.description}</CardDescription>

        <div className="flex gap-2 mt-3">
          <Badge variant="secondary">{task.priority.toUpperCase()}</Badge>

          <Badge
            className={
              task.completed
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-yellow-500 text-black hover:bg-yellow-600"
            }
          >
            {task.completed ? "Completed" : "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Due Date</span>
          <span className="font-medium">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Created</span>
          <span className="font-medium">
            {new Date(task.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-3">
        <Button variant="destructive" onClick={() => onDelete(task._id)}>
          <Trash2 className="h-4 w-4" />
          {deleteMutation.isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <p>Deleting...</p>
            </>
          ) : (
            <>Delete</>
          )}
        </Button>

        <Button
          className={
            task.completed
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-green-600 hover:bg-green-700"
          }
          onClick={() =>
            task.completed ? onIncomplete(task._id) : onComplete(task._id)
          }
        >
          {task.completed ? (
            <>
              {incompleteMutation?.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Marking...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Mark Incomplete
                </>
              )}
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Complete
            </>
          )}
        </Button>
        <Button
          variant="default"
          onClick={() => navigate(`/tasks/edit/${task._id}`)}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
