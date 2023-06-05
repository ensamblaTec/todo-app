import { AxiosRequestConfig } from "axios";
import axios from "../utils/config/axios.config";
// import { useSessionStorage } from "../hooks/useSessionStorage";

export const getAllTasks = (token: string, limit?: number, page?: number) => {
  // http://localhost:8000/api/v1/tasks?limit=limit&page=page -> GET
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: {
      limit,
      page,
    },
  };

  return axios.get("/tasks", options);
};

export const getTaskByID = (token: string, id: string) => {
  // http://localhost:8000/api/v1/tasks/id -> GET
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
  };
  console.log(token);

  return axios.get(`/tasks/${id}`, options);
};

export const updateTaskByID = (token: string, id: string, task: any) => {
  // http://localhost:8000/api/v1/tasks/id -> PUT
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
      "Content-Type": "application/json",
    },
  };

  return axios.put(`/tasks/${id}`, task, options);
};

export const deleteTaskByID = (token: string, id: string) => {
  // http://localhost:8000/api/v1/tasks/id -> DELETE
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
  };

  return axios.delete(`/tasks/${id}`, options);
};

export const createTask = (token: string, task: any) => {
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    }
  };

  return axios.post(`/tasks`, task, options);
}