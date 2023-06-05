import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getAllTasks } from "../services/taskService";
import { AxiosResponse } from "axios";
import { Task } from "../utils/types/Task.type";
import { TasksMaterial } from "../components/forms/TasksMaterial";

const TasksPage = () => {
  let loggedIn = useSessionStorage("sessionToken");

  let navigate = useNavigate();

  const [tasks, setTasks] = useState([]); // Initial Tasks
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!loggedIn) return navigate("/login");
    else {
      getAllTasks(loggedIn, 2, 1)
        .then((response: AxiosResponse) => {
          if (
            response.status === 200 &&
            response.data.tasks &&
            response.data.totalPages &&
            response.data.currentPage
          ) {
            console.table(response.data);
            let { tasks, totalPages, currentPage } = response.data;
            setTasks(tasks);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
          } else
            throw new Error(`[NOTES PAGE] Error obtaining tasks: ${response}`);
        })
        .catch((err) =>
          console.log(`Get all Tasks has failed in NotesPage ${err}`)
        );
    }
  }, [loggedIn]);

  /**
   * Method to navigate to Note details
   * @param {string} id of Note to navigate to
   */
  const navigateToTaskDetail = (id: string) => {
    navigate(`/tasks/${id}`);
  };

  return (
    <div>
      <TasksMaterial />
    </div>
  );
};

export default TasksPage;
