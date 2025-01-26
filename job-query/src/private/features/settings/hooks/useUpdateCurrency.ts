import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateCurrency } from "../../../../shared/services/apiUser";
import { Recruiter, RecruiterErrors } from "../../../../shared/types/user";

export function useUpdateCurrency(resource: Partial<Recruiter> | null) {
  const [form, setForm] = useState({
    currencyId: resource?.currencyId ?? undefined,
  });
  const [errors, setErrors] = useState<Partial<RecruiterErrors>>({
    currencyId: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: Partial<Recruiter>) => updateCurrency(form),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Your currency data have been updated successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to update your currency data! Error: " + error.message,
      );
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = !value && "Please select an option";
    setErrors({ ...errors, [name]: error });
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<RecruiterErrors> = {
      currencyId: !form.currencyId && "Please select an option",
    };

    setErrors(newErrors as Partial<RecruiterErrors>);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm) return;

    try {
      await mutation.mutateAsync(form);
      console.log("Submission successful.");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message || "Updating currency data failed!",
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
