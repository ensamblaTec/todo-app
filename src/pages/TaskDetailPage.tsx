import React, { useEffect, useState } from "react";

// React Router DOM Imports
import { useNavigate, useParams } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Editor } from "../components/editor/Editor";
import { getTaskByID } from "../services/taskService";
import { AxiosResponse } from "axios";
import { Task } from "../utils/types/Task.type";
import { TasksDetailMaterial } from "../components/forms/TaskDetailMaterial";

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
      {task ? (<><TasksDetailMaterial {...task}/></>
      ) : (
        <div></div>
      )}
      <Editor></Editor>
    </div>
  );
};

export default TaskDetailPage;
