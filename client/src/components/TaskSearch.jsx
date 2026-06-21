import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

const TaskSearch = ({ search, setSearch }) => {
  return (
    <div className="mt-4 mb-6">
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="pl-10"
        />

        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default TaskSearch;
