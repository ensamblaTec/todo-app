import React, { useEffect, useState } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Editor } from "../components/editor/Editor";
import { getTaskByID } from "../services/taskService";
import { AxiosResponse } from "axios";
import { Task } from "../utils/types/Task.type";

const TaskDetailPage = () => {
  let loggedIn = useSessionStorage("sessionToken");
  let navigate = useNavigate();
  // Find id from params
  let { id } = useParams();
  const [task, setTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    if (!loggedIn) return navigate("/login");
    else {
      if (id) {
        getTaskByID(loggedIn, id)
          .then((response: AxiosResponse) => {
            if (response.status === 200 && response.data) {
              let taskData: any = {
                _id: response.data._id,
                title: response.data.title,
                description: response.data.description,
                owner: response.data.owner,
                created_at: response.data.created_at,
                tag: response.data.tag,
              };
              console.table(response.data);
              setTask(taskData);
            }
          })
          .catch((err) =>
            console.log(
              `Something has ocurred obtaining Task with id ${id}: ${err}`
            )
          );
      } else return navigate("/tasks");
    }
  }, [loggedIn]);

  return (
    <div>
      <h1>Task Detail Page {id}</h1>
      {task ? (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <h4>Description: {task?.description}</h4>
          <h5>Owner: {task.owner}</h5>
          <div>
            <h5>Tags: </h5>
            {task?.tag.length > 0 ? (
              <div>
                <ul>
                  {task.tag.map((item) => (<li>{item}</li>))}
                </ul>
              </div>
            ) : (
              <div>Loading data...</div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <Editor></Editor>
    </div>
  );
};

export default TaskDetailPage;
