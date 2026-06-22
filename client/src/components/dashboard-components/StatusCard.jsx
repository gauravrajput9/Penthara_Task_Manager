import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle2, Clock3 } from "lucide-react";

const StatusCard = ({
  completedTasks,
  pendingTasks,
  totalTasks,
}) => {
  const completedPercentage =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  const pendingPercentage =
    totalTasks > 0
      ? Math.round((pendingTasks / totalTasks) * 100)
      : 0;

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>Task Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Completed */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="font-medium">
                Completed
              </span>
            </div>

            <span className="font-bold text-green-600">
              {completedTasks}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${completedPercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Pending */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">
                Pending
              </span>
            </div>

            <span className="font-bold text-yellow-600">
              {pendingTasks}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-yellow-500"
              style={{
                width: `${pendingPercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="border-t pt-4 text-sm text-muted-foreground">
          {completedPercentage}% of your tasks have been completed.
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;