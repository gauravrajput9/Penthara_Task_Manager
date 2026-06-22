import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const PriorityCard = ({ tasks }) => {
  const high = tasks.filter((t) => t.priority === "high").length;
  const medium = tasks.filter((t) => t.priority === "medium").length;
  const low = tasks.filter((t) => t.priority === "low").length;

  const total = tasks.length || 1;

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle>Priority Breakdown</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex justify-between">
            <span>High</span>
            <span>{high}</span>
          </div>

          <Progress value={(high / total) * 100} />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>Medium</span>
            <span>{medium}</span>
          </div>

          <Progress value={(medium / total) * 100} />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>Low</span>
            <span>{low}</span>
          </div>

          <Progress value={(low / total) * 100} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorityCard;
