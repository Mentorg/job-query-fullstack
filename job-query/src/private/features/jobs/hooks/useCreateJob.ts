import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jobValidation as validation } from "../validation/jobValidation";
import { createJob } from "../../../../shared/services/apiJobs";
import { CreateJob, JobErrors } from "../../../../shared/types/job";

export function useCreateJob() {
  const [form, setForm] = useState<CreateJob>({
    title: "",
    isFulltime: true,
    workPreference: "",
    seniority: "",
    experience: 0,
    salaryFrom: 100,
    salaryTo: 100,
    isSalaryMonthly: true,
    hasVisaSponsorship: false,
    education: "",
    locations: [0],
    positionOverview: "",
    qualifications: [""],
    responsibilities: [""],
  });

  const [errors, setErrors] = useState<JobErrors>({
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

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/dashboard/jobs");
      toast.success("Job advertisement created successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to create job advertisement! Error: " + error.message,
      );
    },
  });

  const addResponsibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm((prevData) => ({
      ...prevData,
      responsibilities: [...(prevData.responsibilities ?? []), ""],
    }));
  };

  const addQualification = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm((prevData) => ({
      ...prevData,
      qualifications: [...(prevData.qualifications ?? []), ""],
    }));
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const updatedResponsibilities = [...(form.responsibilities ?? [])];
    updatedResponsibilities[index] = value;

    setForm((prevData) => ({
      ...prevData,
      responsibilities: updatedResponsibilities,
    }));
  };

  const handleQualificationChange = (index: number, value: string) => {
    const updatedQualifications = [...(form.qualifications ?? [])];
    updatedQualifications[index] = value;

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
      newValue = Array.isArray(value) ? value.map(Number) : [Number(value)];
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

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof JobErrors],
    );
    console.log(errors);
    if (errorFields.length > 0) return;
    console.log("Form completed successfully", form);
    mutation.mutate(form);
  };

  return {
    form,
    errors,
    addResponsibility,
    addQualification,
    handleResponsibilityChange,
    handleQualificationChange,
    handleChange,
    handleSubmit,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
