import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateUserPassword } from "../../../../shared/services/apiUser";
import { passwordValidation as validation } from "../validation/updatePasswordValidation";
import {
  PasswordUpdateFields,
  PasswordUpdateFieldsErrors,
} from "../../../../shared/types/user";

export function useUpdatePassword() {
  const [form, setForm] = useState<PasswordUpdateFields>({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [errors, setErrors] = useState<PasswordUpdateFieldsErrors>({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (form: PasswordUpdateFields) => updateUserPassword(form),
    onSuccess: () => {
      toast.success("Your password has been updated successfully.");
    },
    onError: (error) => {
      toast.error("Failed to update your password! Error: " + error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: PasswordUpdateFieldsErrors = {
      current_password: validation("current_password", form.current_password),
      new_password: validation("new_password", form.new_password),
      new_password_confirmation: validation(
        "new_password_confirmation",
        form.new_password_confirmation,
      ),
    };

    setErrors(newErrors);
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
          error.response?.data.message || "Updating password failed!",
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
