import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./components/Landing";
import CreateTask from "./components/tasks/CreateTask";
import TasksList from "./components/tasks/TasksList";
import Dashboard from "./components/Dashboard";

import Profile from "./components/user-components/Profile";
import Login from "./components/user-components/Login";
import Register from "./components/user-components/Register";
import PublicRoute from "./lib/PublicRoutes";
import ProtectedRoute from "./lib/ProtectedRoutes";



const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/user/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/user/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TasksList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/createTask"
        element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/edit/:id"
        element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
