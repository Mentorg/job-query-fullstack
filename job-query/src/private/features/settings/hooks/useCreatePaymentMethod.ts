import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createCompanyPaymentMethod } from "../../../../shared/services/apiCompany";
import { cardValidation as validation } from "../validation/cardValidation";
import {
  CreatePaymentMethodForm,
  CreatePaymentMethodFormErrors,
} from "../../../../shared/types/payment_method";

export function useCreatePaymentMethod() {
  const [form, setForm] = useState<CreatePaymentMethodForm>({
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    isActive: false,
  });

  const [errors, setErrors] = useState<CreatePaymentMethodFormErrors>({
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    isActive: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCompanyPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/dashboard/settings/billing");
      toast.success("Payment method data submitted successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to submit payment method data! Error: " + error.message,
      );
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });

    const newValue = type === "checkbox" ? checked : value;
    setForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    const newErrors: CreatePaymentMethodFormErrors = {
      cardType: validation("cardType", form.cardType),
      cardNumber: validation("cardNumber", form.cardNumber),
      expirationDate: validation("expirationDate", form.expirationDate),
      cvv: validation("cvv", form.expirationDate),
      isActive: validation("isActive", form.expirationDate),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      await mutation.mutateAsync(form);
      console.log("Submission successful.");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message || "Creating credit card failed!",
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
