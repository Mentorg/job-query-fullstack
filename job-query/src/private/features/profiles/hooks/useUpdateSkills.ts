import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateApplicantSkills } from "../../../../shared/services/apiUser";
import { Ability, UpdateSkills } from "../../../../shared/types/ability";

export function useUpdateSkills(skills: Ability[]) {
  const [form, setForm] = useState({
    skills: skills.map((record: Ability) => record.id),
  });
  const [errors, setErrors] = useState({
    skills: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: UpdateSkills) => updateApplicantSkills(form),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Your skills have been updated successfully.");
    },
    onError: (error) => {
      toast.error("Failed to update your skills! Error: " + error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const currentSkills = form.skills || [];
      const newSkills = checked
        ? [...currentSkills, Number(value)]
        : currentSkills.filter((id: number) => id !== Number(value));

      setForm((prevData) => ({
        ...prevData,
        [name]: newSkills,
      }));
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {
      skills: form.skills.length > 0 ? "" : "Please select at least one skill.",
    };

    setErrors(newErrors);
    return !newErrors.skills;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      await mutation.mutateAsync(form);
      console.log("Submission successful.", form);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message || "Updating applicant's skills failed!",
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
