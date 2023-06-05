import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TasksPage from "../pages/TasksPage";
import TaskDetailPage from "../pages/TaskDetailPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes definition */}
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/tasks" element={<TasksPage />}></Route>
      <Route path="/tasks/:id" element={<TaskDetailPage />}></Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};
