import { Link } from "react-router-dom";
import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <ListTodo className="h-6 w-6" />
          <span className="font-bold text-lg">TaskTracker</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#features">Features</a>
          <a href="#stats">Statistics</a>
          <a href="#tasks">Tasks</a>
        </nav>

        <Button>
          <Link to="/createTask">Create Task</Link>
        </Button>
      </div>
    </header>
  );
}
