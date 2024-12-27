import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateLocaleSettings } from "../../../../shared/services/apiUser";
import { LocaleErrors, User } from "../../../../shared/types/user";

export function useUpdateLocaleSettings(localeSetting: Partial<User> | null) {
  const [form, setForm] = useState({
    language: localeSetting?.language ?? "",
    timezone: localeSetting?.timezone ?? "",
    currencyId: localeSetting?.currencyId ?? undefined,
  });
  const [errors, setErrors] = useState<LocaleErrors>({
    language: "",
    timezone: "",
    currencyId: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: Partial<User>) => updateLocaleSettings(form),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Your locale settings have been updated successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to update your locale settings! Error: " + error.message,
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
    const newErrors: LocaleErrors = {
      language: !form.language && "Please select an option",
      timezone: !form.timezone && "Please select an option",
      currencyId: !form.currencyId && "Please select an option",
    };

    setErrors(newErrors as LocaleErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm) {
      return;
    }

    try {
      await mutation.mutateAsync(form);
      console.log("Submission successful.");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message || "Updating locale settings failed!",
        );
      }
      throw new Error("An unexpected error occurred!");
    }
  };

  return { form, errors, handleChange, handleSubmit, isSubmitted };
}
