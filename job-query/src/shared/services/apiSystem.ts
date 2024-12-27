import { AxiosError } from "axios";
import axiosInstance from "./axiosConfig";

// list subscriptions
export const getSubscriptions = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/subscriptions`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching subscription data failed!");
    }
  }
};

// list locations
export const getLocations = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/locations`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching locations failed!");
    }
  }
};

// list currencies
export const getCurrencies = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/currencies`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching currencies failed!");
    }
  }
};

// list skills
export const getSkills = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/skills`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching skills failed!");
    }
  }
};

// list languages
export const getLanguages = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/languages`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching languages failed!");
    }
  }
};
