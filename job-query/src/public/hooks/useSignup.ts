import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup, login } from "../../shared/services/apiAuth";
import { useAuth } from "../../shared/context/AuthContext";
import { signupValidation as validation } from "../data/validation/signupValidation";
import { SignupErrors, SignupProps } from "../../shared/types/user";

export function useSignup() {
  const [form, setForm] = useState<SignupProps>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: "",
    location: 0,
    phone: "",
    linkedin_profile: "",
    timezone: "Canada/Atikokan",
    language: "English",
  });

  const [errors, setErrors] = useState<SignupErrors>({
    name: undefined,
    email: undefined,
    password: undefined,
    password_confirmation: undefined,
    avatar: undefined,
    location: undefined,
    phone: undefined,
    linkedin_profile: undefined,
    timezone: undefined,
    language: undefined,
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => signup(formData),
    onSuccess: async (data) => {
      if (!data || !data.data || !data.data.user || !data.data.token) {
        toast.error("Signup successful, but user data is missing.");
        return;
      }

      const { email, password } = {
        email: data.data.user.email,
        password: form.password,
      };

      const loginData = await login({ email, password });
      navigate("/");

      if (!loginData || !loginData.user || !loginData.token) {
        throw new Error("Login failed: Missing user or token in response.");
      }

      setUser(loginData.user);
      localStorage.setItem("authToken", loginData.token);
      localStorage.setItem("userId", loginData.user.id);
    },
    onError: (error) => {
      throw new Error(`Error during signup mutation: ${error.message}`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const error = validation(name, value, form);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const validateForm = (): boolean => {
    const newErrors: SignupErrors = {
      name: validation("name", form.name),
      email: validation("email", form.email),
      password: validation("password", form.password),
      password_confirmation: validation(
        "password_confirmation",
        form.password_confirmation,
        form,
      ),
      avatar: form.avatar ? validation("avatar", form.avatar) : "",
      location: validation("location", form.location.toString()),
      phone: validation("phone", form.phone || ""),
      linkedin_profile: validation(
        "linkedin_profile",
        form.linkedin_profile || "",
      ),
      timezone: validation("timezone", form.timezone || ""),
      language: validation("language", form.language || ""),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) return;

    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof SignupErrors],
    );

    if (errorFields.length > 0) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("password_confirmation", form.password_confirmation);
    formData.append("location", form.location.toString());
    formData.append("phone", form.phone || "");
    formData.append("linkedin_profile", form.linkedin_profile || "");
    formData.append("timezone", form.timezone || "");
    formData.append("language", form.language || "");

    if (file) {
      formData.append("avatar", file);
    }

    mutation.mutate(formData);
  };

  return {
    errors,
    form,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitted,
  };
}
