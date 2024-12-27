import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup, login } from "../../shared/services/apiAuth";
import { useAuth } from "../../shared/context/AuthContext";
import { registrationValidation as validation } from "../data/validation/signupValidation";

type SignupProps = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type FormError = {
  name: boolean | string | undefined;
  email: boolean | string | undefined;
  password: boolean | string | undefined;
  password_confirmation: boolean | string | undefined;
};

export function useSignup() {
  const [signupForm, setSignupForm] = useState<SignupProps>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<FormError>({
    name: undefined,
    email: undefined,
    password: undefined,
    password_confirmation: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (credentials: SignupProps) => signup(credentials),
    onSuccess: async (data) => {
      if (!data || !data.data || !data.data.user || !data.data.token) {
        toast.error("Signup successful, but user data is missing.");
        return;
      }

      const { email, password } = {
        email: data.data.user.email,
        password: signupForm.password,
      };

      try {
        const loginData = await login({ email, password });

        console.log("Login Data:", loginData);
        navigate("/");

        if (!loginData || !loginData.user || !loginData.token) {
          throw new Error("Login failed: Missing user or token in response.");
        }

        setUser(loginData.user);
        localStorage.setItem("authToken", loginData.token);
        localStorage.setItem("userId", loginData.user.id);
        toast.success("Registration successful! Welcome aboard.");
        console.log("Navigating to home...");
      } catch (error) {
        throw new Error("Unexpected error:");
      }
    },

    onError: (error) => {
      toast.error(
        "Oops! There was an issue with your registration. Please try again. " +
          error.message,
      );
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validation(name, value, signupForm);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setSignupForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormError = {
      name: validation("name", signupForm.name),
      email: validation("email", signupForm.email),
      password: validation("password", signupForm.password),
      password_confirmation: validation(
        "password_confirmation",
        signupForm.password_confirmation,
        signupForm,
      ),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof FormError],
    );

    if (errorFields.length > 0) {
      console.log("Error fields:", errorFields);
      return;
    }

    mutation.mutate(signupForm);
  };

  return {
    errors,
    signupForm,
    handleChange,
    handleSubmit,
    isSubmitted,
  };
}
