import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createApplicantExperience } from "../../../../shared/services/apiUser";
import { experienceValidation as validation } from "../validation/experienceValidation";
import {
  CreateExperience,
  CreateExperienceErrors,
} from "../../../../shared/types/experience";

export function useCreateExperience() {
  const [form, setForm] = useState<CreateExperience>({
    company: "",
    title: "",
    dateStart: "",
    dateEnd: "",
    locationId: 0,
  });
  const [errors, setErrors] = useState<CreateExperienceErrors>({
    company: "",
    title: "",
    dateStart: "",
    dateEnd: "",
    locationId: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createApplicantExperience,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/user/profile");
      toast.success("Experience details submitted successfully.");
    },
    onError: (error) => {
      toast.error("Failed to submit experience data! Error: " + error.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const error = validation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: CreateExperienceErrors = {
      company: validation("company", form.company),
      title: validation("title", form.title),
      dateStart: validation("dateStart", form.dateStart),
      dateEnd: validation("dateEnd", form.dateEnd),
      locationId: validation("locationId", form.locationId.toString()),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      console.log("Validation failed, not submitting form.");
      return;
    }
    await mutation.mutate(form);
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isSubmitted,
  };
}
