import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateUserEmail } from "../../../../shared/services/apiUser";
import { User } from "../../../../shared/types/user";

export function useUpdateEmail(account: Partial<User> | null) {
  const [form, setForm] = useState({
    email: account?.email || "",
  });
  const [errors, setErrors] = useState<{ email: boolean | string }>({
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (form: Partial<User>) => updateUserEmail(form),
    onSuccess: () => {
      toast.success("Your email address has been updated successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to update your email address! Error: " + error.message,
      );
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error =
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) &&
      "Please provide a valid email address";
    setErrors({ ...errors, [name]: error });
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { email: boolean | string } = {
      email:
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email) &&
        "Please provide a valid email address",
    };

    setErrors(newErrors as { email: boolean | string });

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
          error.response?.data.message || "Updating email failed!",
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
