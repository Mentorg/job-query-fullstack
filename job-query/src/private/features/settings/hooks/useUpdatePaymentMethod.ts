import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateCompanyPaymentMethod } from "../../../../shared/services/apiCompany";
import {
  UpdatePaymentMethodForm,
  UpdatePaymentMethodFormErrors,
} from "../../../../shared/types/payment_method";
import { cardValidation as validation } from "../validation/cardValidation";

export function useUpdatePaymentMethod(paymentMethod: UpdatePaymentMethodForm) {
  const [form, setForm] = useState({
    id: paymentMethod.id,
    cardType: paymentMethod.cardType,
    cardNumber: paymentMethod.cardNumber,
    expirationDate: paymentMethod.expirationDate,
    cvv: paymentMethod.cvv,
    isActive: paymentMethod.isActive,
  });

  const [errors, setErrors] = useState<UpdatePaymentMethodFormErrors>({
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: UpdatePaymentMethodForm) =>
      updateCompanyPaymentMethod(form, paymentMethod.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Payment method data updated successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to update payment method data! Error " + error.message,
      );
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const error = validation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    const newValue = type === "checkbox" ? checked : value;
    setForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    const newErrors: UpdatePaymentMethodFormErrors = {
      cardType: validation("cardType", form.cardType),
      cardNumber: validation("cardNumber", form.cardNumber),
      expirationDate: validation("expirationDate", form.expirationDate),
      cvv: validation("cvv", form.cvv),
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
          error.response?.data.message || "Updating payment method failed!",
        );
      }
      throw new Error("An unexpected error occurred!");
    }
  };

  return { form, errors, handleChange, handleSubmit, isSubmitted };
}
