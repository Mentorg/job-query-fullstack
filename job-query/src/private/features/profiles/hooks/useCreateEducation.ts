import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createApplicantEducation } from "../../../../shared/services/apiUser";
import { educationValidation as validation } from "../validation/educationValidation";
import {
  CreateEducation,
  EducationErrors,
} from "../../../../shared/types/education";

export function useCreateEducation() {
  const [form, setForm] = useState<CreateEducation>({
    department: "",
    degree: "",
    university: "",
    honors: "",
    gpa: "",
    dateStart: "",
    dateEnd: "",
  });
  const [errors, setErrors] = useState<EducationErrors>({
    department: "",
    degree: "",
    university: "",
    honors: "",
    gpa: "",
    dateStart: "",
    dateEnd: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createApplicantEducation,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/user/profile");
      toast.success("Education data submitted successfully.");
    },
    onError: (error) => {
      toast.error("Failed to submit education data! Error: " + error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const error = validation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: EducationErrors = {
      department: validation("department", form.department),
      degree: validation("degree", form.degree),
      university: validation("university", form.university),
      honors: validation("honors", form.honors),
      gpa: validation("gpa", form.gpa),
      dateStart: validation("dateStart", form.dateStart),
      dateEnd: validation("dateEnd", form.dateEnd),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      await mutation.mutate(form);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message ||
            "Creating applicant's education failed",
        );
      }
      throw new Error("An unexpected error occurred!");
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isSubmitted,
  };
}
