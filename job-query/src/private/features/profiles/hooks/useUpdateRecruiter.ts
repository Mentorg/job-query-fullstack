import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateRecruiter } from "../../../../shared/services/apiUser";
import { recruiterValidation as validation } from "../validation/recruiterValidation";
import { Recruiter, RecruiterErrors } from "../../../../shared/types/user";

export function useUpdateRecruiter(recruiter: Recruiter) {
  const [form, setForm] = useState({
    expertise: recruiter.expertise,
    description: recruiter.description,
  });

  const [errors, setErrors] = useState<RecruiterErrors>({
    expertise: "",
    description: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: Recruiter) => updateRecruiter(form),
    onSuccess: () => {
      queryClient.invalidateQueries(),
        toast.success(
          "Your recruiter information has been updated successfully.",
        );
    },
    onError: (error) => {
      toast.error(
        "Failed to update your recruiter information! Error: " + error.message,
      );
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: RecruiterErrors = {
      expertise: validation("expertise", form.expertise),
      description: validation("description", form.description),
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
          error.response?.data.message || "Updating recruiter failed!",
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
