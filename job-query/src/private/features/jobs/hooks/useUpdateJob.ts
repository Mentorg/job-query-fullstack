import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateJob } from "../../../../shared/services/apiJobs";
import { UpdateJob } from "../../../../shared/types/job";
import { jobValidation as validation } from "../validation/jobValidation";

export function useUpdateJob(job: UpdateJob) {
  const [form, setForm] = useState<UpdateJob>({
    id: job.id,
    title: job.title,
    isFulltime: job.isFulltime,
    workPreference: job.workPreference,
    seniority: job.seniority,
    experience: job.experience,
    salaryFrom: job.salaryFrom,
    salaryTo: job.salaryTo,
    isSalaryMonthly: job.isSalaryMonthly,
    hasVisaSponsorship: job.hasVisaSponsorship,
    education: job.education,
    locations: job.locations
      ? job.locations.every((loc) => typeof loc === "object" && "id" in loc)
        ? job.locations.map((location) => location.id)
        : []
      : [],
    positionOverview: job.positionOverview,
    qualifications: job.qualifications.map((qualification) => ({
      id: qualification.id,
      description: qualification.description,
      job_listings_id: job.id,
    })),
    responsibilities: job.responsibilities.map((responsibility) => ({
      id: responsibility.id,
      description: responsibility.description,
      job_listings_id: job.id,
    })),
  });

  const [errors, setErrors] = useState({
    title: "",
    isFulltime: false,
    workPreference: "",
    seniority: "",
    experience: 0,
    salaryFrom: 0,
    salaryTo: 0,
    isSalaryMonthly: false,
    hasVisaSponsorship: false,
    education: "",
    locations: "",
    positionOverview: "",
    qualifications: "",
    responsibilities: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: Partial<UpdateJob>) => updateJob(form, job.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Job advertisement updated successfully.");
    },
    onError: (error: AxiosError) => {
      toast.error(
        "Failed to update job advertisement! Error: " + error.message,
      );
    },
  });

  const addResponsibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm((prevData) => ({
      ...prevData,
      responsibilities: [
        ...(prevData.responsibilities || []),
        { id: 0, description: "", job_listings_id: prevData.id || 0 },
      ],
    }));
  };

  const addQualification = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm((prevData) => ({
      ...prevData,
      qualifications: [
        ...(prevData.qualifications || []),
        { id: 0, description: "", job_listings_id: prevData.id || 0 },
      ],
    }));
  };

  const removeResponsibility = (index: number) => {
    const updatedResponsibilities = (form.responsibilities || []).filter(
      (_, idx) => idx !== index,
    );
    setForm((prevData) => ({
      ...prevData,
      responsibilities: updatedResponsibilities,
    }));
  };

  const removeQualification = (index: number) => {
    const updatedQualifications = (form.qualifications || []).filter(
      (_, idx) => idx !== index,
    );
    setForm((prevData) => ({
      ...prevData,
      qualifications: updatedQualifications,
    }));
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const updatedResponsibilities = [...(form.responsibilities || [])];
    updatedResponsibilities[index] = {
      ...updatedResponsibilities[index],
      description: value,
    };
    setForm((prevData) => ({
      ...prevData,
      responsibilities: updatedResponsibilities,
    }));
  };

  const handleQualificationChange = (index: number, value: string) => {
    const updatedQualifications = [...(form.qualifications || [])];
    updatedQualifications[index] = {
      ...updatedQualifications[index],
      description: value,
    };
    setForm((prevData) => ({
      ...prevData,
      qualifications: updatedQualifications,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });

    let newValue;

    if (name === "locations") {
      newValue = value.split(",").map((id) => Number(id));
    } else {
      newValue =
        type === "checkbox"
          ? checked
          : type === "radio"
            ? value === "true"
            : value;
    }

    setForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(form);
      console.log("Submission successful!");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message || "Updating job advertisement failed!",
        );
      }
      throw new Error("An unexpected error occurred!");
    }
  };

  return {
    form,
    errors,
    addResponsibility,
    addQualification,
    removeResponsibility,
    removeQualification,
    handleResponsibilityChange,
    handleQualificationChange,
    handleChange,
    handleSubmit,
  };
}
