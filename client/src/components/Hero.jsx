import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-4 flex justify-center">
          <span className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            Organize your workflow
          </span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          Stay Organized.
          <br />
          Track Every Task.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-lg">
          Create, manage, and complete tasks with a modern task management
          experience powered by React, Express, MongoDB, and smart filtering.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/createTask">
            {" "}
            <Button size="lg">Create Task</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
