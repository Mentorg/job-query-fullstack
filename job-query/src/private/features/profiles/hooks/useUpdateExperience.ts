import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateApplicantExperience } from "../../../../shared/services/apiUser";
import { experienceValidation as validation } from "../validation/experienceValidation";
import {
  UpdateExperience,
  UpdateExperienceErrors,
} from "../../../../shared/types/experience";

export function useUpdateExperience(experienceData: UpdateExperience) {
  const [form, setForm] = useState({
    company: experienceData.company,
    title: experienceData.title,
    dateStart: experienceData.dateStart,
    dateEnd: experienceData.dateEnd,
    locationId: experienceData.locationId,
  });
  const [errors, setErrors] = useState<UpdateExperienceErrors>({
    company: "",
    title: "",
    dateStart: "",
    dateEnd: "",
    locationId: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation<void, AxiosError, typeof form>({
    mutationFn: () =>
      updateApplicantExperience(
        {
          ...form,
          id: experienceData.id,
          applicantId: experienceData.applicantId,
        },
        experienceData.id,
        experienceData.applicantId,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Experience data updated successfully.");
    },
    onError: (error) => {
      toast.error("Failed to update experience data! Error: " + error.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const error = validation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: UpdateExperienceErrors = {
      company: validation("company", form.company),
      title: validation("title", form.title),
      dateStart: validation("dateStart", form.dateStart),
      dateEnd: validation("dateEnd", form.dateEnd),
      locationId: validation("locationId", form.locationId.toString() || ""),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      await mutation.mutateAsync(form);
      console.log("Submission successful.");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message ||
            "Updating applicant's experience data failed!",
        );
      }
      throw new Error("An unexpected error occurred!");
    }
  };

  return { form, errors, handleChange, handleSubmit, isSubmitted };
}
