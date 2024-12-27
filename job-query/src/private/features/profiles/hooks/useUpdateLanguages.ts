import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateApplicantLanguages } from "../../../../shared/services/apiUser";
import { Ability, UpdateLanguages } from "../../../../shared/types/ability";

export function useUpdateLanguages(languages: Ability[]) {
  const [form, setForm] = useState({
    languages: languages.map((record: Ability) => record.id),
  });
  const [errors, setErrors] = useState({
    languages: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: UpdateLanguages) => updateApplicantLanguages(form),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Your language skills have been updated successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to update your language skills! Error: " + error.message,
      );
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const currentLanguages = form.languages || [];
      const newLanguages = checked
        ? [...currentLanguages, Number(value)]
        : currentLanguages.filter((id) => id !== Number(value));

      setForm((prevData) => ({
        ...prevData,
        [name]: newLanguages,
      }));
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {
      languages:
        form.languages.length > 0 ? "" : "Please select at least one language.",
    };

    setErrors(newErrors);
    return !newErrors.languages;
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
            "Updating applicant's languages failed!",
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
