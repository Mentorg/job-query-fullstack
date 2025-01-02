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
    avatar: "",
    location: 0,
  });

  const [errors, setErrors] = useState<CreateRecruiterErrors>({
    name: "",
    role: "",
    email: "",
    password: "",
    password_confirmation: "",
    companies: "",
    avatar: "",
    location: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => createRecruiter(formData),
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
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
      avatar: form.avatar ? validation("avatar", form.avatar) : "",
      location: validation("location", form.location.toString()),
      companies: validation("companies", form.companies.toString()),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) return;

    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof CreateRecruiterErrors],
    );

    if (errorFields.length > 0) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("password_confirmation", form.password_confirmation);
    formData.append("location", form.location.toString());
    formData.append("companies", form.companies.toString());

    if (file) {
      formData.append("avatar", file);
    }

    mutation.mutate(formData);
  };

  return {
    form,
    errors,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitted,
  };
}
