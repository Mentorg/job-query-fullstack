import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { createRecruiter } from "../../../../shared/services/apiUser";
import { recruiterAccountValidation as validation } from "../validation/recruiterAccountValidation";
import { useNavigate } from "react-router-dom";
import {
  CreateRecruiter,
  CreateRecruiterErrors,
} from "../../../../shared/types/user";

export function useCreateRecruiter() {
  const [form, setForm] = useState<CreateRecruiter>({
    name: "",
    role: "recruiter",
    email: "",
    password: "",
    password_confirmation: "",
    companies: 0,
  });

  const [errors, setErrors] = useState<CreateRecruiterErrors>({
    name: "",
    role: "",
    email: "",
    password: "",
    password_confirmation: "",
    companies: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createRecruiter,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Recruiter account created successfully.");
      navigate("/admin/users");
    },
    onError: (error) => {
      toast.error(
        "Failed to create recruiter account! Error: " + error.message,
      );
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const error = validation(name, value, form.password);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: CreateRecruiterErrors = {
      name: validation("name", form.name, form.password),
      role: validation("role", form.role, form.password),
      email: validation("email", form.email, form.password),
      password: validation("password", form.password, form.password),
      password_confirmation: validation(
        "password_confirmation",
        form.password_confirmation,
        form.password,
      ),
      companies: validation("companies", form.companies.toString()),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    mutation.mutate(form);
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isSubmitted,
  };
}
