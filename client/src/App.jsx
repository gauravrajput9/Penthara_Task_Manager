// import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import CreateTask from "./components/tasks/CreateTask";
import TasksList from "./components/tasks/TasksList";
import TaskSearch from "./components/TaskSearch";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/createTask" element={<CreateTask />} />
      <Route path="/tasks" element={<TasksList />} />
      <Route path="/tasks/edit/:id" element={<CreateTask />} />
    </Routes>
  );
};

export default App;
