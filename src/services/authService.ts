import axios from "../utils/config/axios.config";

/**
 * Login Method
 * @param {string} email 
 * @param {string} password 
 * @returns Promise
 */
export const login = async (email: string, password: string) => {
  let body = {
    email: email,
    password: password,
  };

  // Send POST request to login endpoint
  return axios.post("/auth/login", body); // Return a promise
};

/**
 * Register metod
 * @param {string} name 
 * @param {number} age 
 * @param {string} email 
 * @param {string} password 
 * @returns Promise
 */

export const register = async (
  name: string,
  age: string,
  email: string,
  password: string
) => {
  let body = {
    name: name,
    age: age,
    admin: false,
    email: email,
    password: password,
  };

  // Send POST request to register endpoint
  return axios.post("/auth/register", body);
};
