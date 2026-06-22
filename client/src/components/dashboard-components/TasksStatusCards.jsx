import { StatsCard } from "./StatsCard";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ListTodo,
} from "lucide-react";

const TasksStatusCards = ({tasks}) => {
  

  const totalTasks = tasks.length
  
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Task Stats
          </h1>

          <p className="mt-3 text-muted-foreground text-lg">
            Get a quick overview of your productivity and progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Tasks"
            value={totalTasks}
            subtitle="All created tasks"
            icon={ListTodo}
            color="border-blue-500"
          />

          <StatsCard
            title="Completed"
            value={completedTasks}
            subtitle="Tasks finished"
            icon={CheckCircle2}
            color="border-green-500"
          />

          <StatsCard
            title="Pending"
            value={pendingTasks}
            subtitle="Still in progress"
            icon={Clock3}
            color="border-yellow-500"
          />

          <StatsCard
            title="High Priority"
            value={highPriorityTasks}
            subtitle="Need attention"
            icon={AlertTriangle}
            color="border-red-500"
          />
        </div>
      </div>
    </section>
  );
};

export default TasksStatusCards;