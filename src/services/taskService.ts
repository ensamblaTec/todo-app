import { AxiosRequestConfig } from "axios";
import axios from "../utils/config/axios.config";

export const getAllTasks = (token: string, limit?: number, page?: number) => {
  // http://localhost:8000/api/v1/tasks?limit=limit&page=page
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
  // http://localhost:8000/api/v1/tasks?id=id
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
  };
  
  return axios.get(`/tasks/${id}`, options);
}