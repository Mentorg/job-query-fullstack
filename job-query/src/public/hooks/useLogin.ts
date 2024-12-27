import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../shared/services/apiAuth";
import { loginValidation as validation } from "../data/validation/loginValidation";

type LoginProps = {
  email: string;
  password: string;
};

type FormError = {
  email: boolean | string | undefined;
  password: boolean | string | undefined;
};

export function useLogin() {
  const [loginForm, setLoginForm] = useState<LoginProps>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormError>({ ...loginForm });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      login(credentials),
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.id);
      navigate("/");
    },
    onError: (error: Error) => {
      throw new Error("Login failed! Error: " + error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });
    setLoginForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormError = {
      email: validation("email", loginForm.email),
      password: validation("password", loginForm.password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isValid = validateForm();
    if (!isValid) return;

    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof FormError],
    );

    if (errorFields.length > 0) return;
    mutation.mutate(loginForm);
  };

  return {
    errors,
    loginForm,
    mutation,
    handleChange,
    handleSubmit,
    isSubmitted,
  };
}
