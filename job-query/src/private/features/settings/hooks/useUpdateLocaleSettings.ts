import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateLocaleSettings } from "../../../../shared/services/apiUser";
import { LocaleErrors, User } from "../../../../shared/types/user";
import i18n from "i18next";
import { useEffect } from "react";

export function useUpdateLocaleSettings(localeSetting: Partial<User> | null) {
  const [form, setForm] = useState({
    language: localeSetting?.language ?? i18n.language,
    timezone: localeSetting?.timezone ?? "",
  });
  const [errors, setErrors] = useState<LocaleErrors>({
    language: "",
    timezone: "",
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

  const handleLanguageChange = async (newLanguage: string) => {
    setForm((prevData) => ({
      ...prevData,
      language: newLanguage,
    }));

    try {
      await mutation.mutateAsync({ language: newLanguage });

      i18n.changeLanguage(newLanguage);
    } catch (error) {
      toast.error("Error updating language.");
    }
  };

  const validateForm = () => {
    const newErrors: LocaleErrors = {
      language: !form.language && "Please select an option",
      timezone: !form.timezone && "Please select an option",
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

  useEffect(() => {
    setForm((prevData) => ({
      ...prevData,
      language: i18n.language,
    }));
  }, [i18n.language]);

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isSubmitted,
    handleLanguageChange,
  };
}
