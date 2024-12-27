import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateCompanyBillingSettings } from "../../../../shared/services/apiCompany";
import { Billing } from "../../../../shared/types/billing";

export function useUpdateBillingSettings(billingSetting: Billing) {
  const [form, setForm] = useState({
    email: billingSetting.email,
    is_autorenew: billingSetting.is_autorenew,
  });
  const [errors, setErrors] = useState<{ email: boolean | string }>({
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: { email: string; is_autorenew: boolean }) =>
      updateCompanyBillingSettings(form, billingSetting.company_id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Billing settings updated successfully.");
    },
    onError: (error) => {
      toast.error("Failed to update billing settings! Error: " + error.message);
    },
  });

  const updateAutoRenew = async (value: boolean) => {
    try {
      await updateCompanyBillingSettings(
        { is_autorenew: value },
        billingSetting.company_id,
      );
      setForm((prevData) => ({
        ...prevData,
        is_autorenew: value,
      }));
      console.log("Auto-renew setting updated successfully.");
    } catch (error) {
      console.error("Error updating auto-renew setting: ", error);
    }
  };

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
          error.response?.data.message || "Updating billing settings failed!",
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
    updateAutoRenew,
    isSubmitted,
  };
}
