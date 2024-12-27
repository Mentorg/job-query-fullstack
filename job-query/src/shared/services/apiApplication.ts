import { AxiosError } from "axios";
import axiosInstance from "./axiosConfig";

// get recruiter applications
export const getRecruiterApplications = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/recruiter/applications`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Fetching recruiter applications data failed!",
      );
    }
  }
};

// update application's note
export const updateApplicationNote = async (
  applicationData: { note: string },
  id: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/application/${id}/note`,
      applicationData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating application's status failed!");
    }
  }
};

// update application status
export const updateApplicationStatus = async (
  applicationData: { status: string },
  id: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/application/${id}/status`,
      applicationData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating application status failed!");
    }
  }
};
