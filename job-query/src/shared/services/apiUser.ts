import { AxiosError } from "axios";
import axiosInstance from "./axiosConfig";
import { Recruiter, User } from "../types/user";
import { NotificationSettings } from "../types/notification_settings";
import { CreateEducation, Education } from "../types/education";
import { UpdateLanguages, UpdateSkills } from "../types/ability";
import { PasswordUpdateFields } from "../types/user";
import { CreateExperience, UpdateExperience } from "../types/experience";

// index
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/users`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching users data failed!");
    }
  }
};

// create
export const createRecruiter = async (userData: FormData) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/register?recruiterRegistration=true`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Creating a new user account failed!");
    }
  }
};

// update user data
export const updateUser = async (userId: number, userData: FormData) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/profile/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating user profile failed!");
    }
  }
};

// get recruiter
export const getRecruiter = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/recruiter?detailed=true`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching recruiter data failed!");
    }
  }
};

// get recruiter's team
export const getRecruiterTeam = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/recruiter/team`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Fetching company's recruiters data failed!",
      );
    }
  }
};

// update recruiter data
export const updateRecruiter = async (recruiterData: Partial<Recruiter>) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/recruiter`,
      recruiterData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating recruiter data failed!");
    }
  }
};

// update user email
export const updateUserEmail = async (user: Partial<User>) => {
  try {
    const response = await axiosInstance.put(`/api/v1/email`, user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating email failed!");
    }
  }
};

// update user password
export const updateUserPassword = async (user: PasswordUpdateFields) => {
  try {
    const response = await axiosInstance.put(`/api/v1/password`, user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating password failed!");
    }
  }
};

// delete user
export const deleteUser = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/users/${Number(id)}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Deleting user failed!");
    }
  }
};

// update locale settings
export const updateLocaleSettings = async (
  localeSettingsData: Partial<User>,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/user/locale`,
      localeSettingsData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Updating locale settings failed!");
    }
  }
};

// get user currency
export const getUserCurrency = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/user/currency`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching user currency failed!");
    }
  }
};

// get recruiter notification settings
export const getRecruiterNotificationSettings = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/recruiter/notificationSettings`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Fetching user notification settings failed!",
      );
    }
  }
};

export const getRecruiterCompany = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/recruiter/company`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Fetching recruiter company data failed!",
      );
    }
  }
};

// update notification settings
export const updateRecruiterNotificationSettings = async (
  notificationSettings: Partial<NotificationSettings>,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/recruiter/notificationSettings`,
      notificationSettings,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Updating notification settings failed!",
      );
    }
  }
};

// add applicant education
export const createApplicantEducation = async (
  educationData: CreateEducation,
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/applicants/education`,
      educationData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Creating user's education failed!");
    }
  }
};

// update applicant education
export const updateApplicantEducation = async (
  educationData: Education,
  educationId: number,
  applicantId: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/applicants/${Number(applicantId)}/education/${Number(educationId)}`,
      educationData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Updating applicant's education data failed!",
      );
    }
  }
};

// delete applicant education
export const deleteApplicantEducation = async (
  applicantId: number,
  educationId: number,
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/applicants/${Number(applicantId)}/education/${Number(educationId)}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Deleting applicant's education data failed!",
      );
    }
  }
};

// add applicant experience
export const createApplicantExperience = async (
  experienceData: CreateExperience,
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/applicants/experience`,
      experienceData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Creating user's experience failed!");
    }
  }
};

// update applicant experience
export const updateApplicantExperience = async (
  experienceData: UpdateExperience,
  experienceId: number,
  applicantId: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/applicants/${Number(applicantId)}/experience/${Number(experienceId)}`,
      experienceData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Updating applicant's experience data failed!",
      );
    }
  }
};

// delete applicant experience
export const deleteApplicantExperience = async (
  applicantId: number,
  experienceId: number,
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/applicants/${Number(applicantId)}/experience/${Number(experienceId)}`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Deleting applicant's experience data failed!",
      );
    }
  }
};

// update applicant skills
export const updateApplicantSkills = async (skills: UpdateSkills) => {
  try {
    const response = await axiosInstance.put(
      `api/applicant/update/skills`,
      skills,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Deleting applicant's skills failed!");
    }
  }
};

// update applicant languages
export const updateApplicantLanguages = async (languages: UpdateLanguages) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/applicant/update/languages`,
      languages,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.message || "Deleting applicant's languages failed!",
      );
    }
  }
};

// get applicant
export const getApplicant = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/applicant`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "Fetching applicant failed!");
    }
  }
};
