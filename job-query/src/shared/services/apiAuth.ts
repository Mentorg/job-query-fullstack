import axios, { AxiosError } from "axios";
import axiosInstance from "./axiosConfig";

type LoginProps = {
  email: string;
  password: string;
};

export const signup = async (credentials: FormData) => {
  try {
    const response = await axiosInstance.post(`/api/v1/register`, credentials, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Registration failed!");
    }
    throw new Error("An unexpected error occurred!");
  }
};

export const login = async (credentials: LoginProps) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/login`,
      credentials,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    localStorage.setItem("authToken", response.data.token);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Login failed");
    }
    throw new Error("An unexpected error occurred!");
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/v1/logout`,
      {},
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    localStorage.removeItem("authToken");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Logout failed");
    }
    throw new Error("An unexpected error occurred!");
  }
};
