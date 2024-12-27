import { AxiosError } from "axios";
import { CreateJob, JobApplicationPayload, UpdateJob } from "../types/job";
import axiosInstance from "./axiosConfig";

// index
export const getJobs = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/jobs`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching job data failed!");
    }
    throw new Error("An unexpected error occurred!");
  }
};

// store
export const createJob = async (jobData: CreateJob) => {
  try {
    const response = await axiosInstance.post(`/api/v1/jobs`, jobData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Creating job advertisement failed!");
    }
  }
};

// show
export const getJob = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/jobs/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching job data failed!");
    }
  }
};

// update
export const updateJob = async (jobData: Partial<UpdateJob>, id: number) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/jobs/${Number(id)}`,
      jobData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating job advertisement failed!");
    }
  }
};

// delete
export const deleteJob = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/jobs/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Deleting data failed!");
    }
  }
};

// get recruiter jobs
export const getJobsByRecruiter = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/jobs/recruiter/${userId}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching job data failed!");
    }
  }
};

// get applicant jobs
export const getApplicantJobs = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/applicants/${userId}/jobs`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching applicant's jobs failed!");
    }
  }
};

// update job status
export const updateJobStatus = async (
  jobData: { status: string; id: number },
  id: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/jobs/updateStatus/${id}`,
      jobData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating job status failed!");
    }
  }
};

// create application
export const createApplication = async (jobData: JobApplicationPayload) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/jobs/${jobData.id}/apply`,
      {
        status: "received",
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Creating application failed!");
    }
  }
};
