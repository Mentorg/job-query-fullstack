import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { setCompanyDefaultPaymentMethod } from "../../../../shared/services/apiCompany";
import { PaymentMethod } from "../../../../shared/types/payment_method";

export function useSetDefaultPaymentMethod(paymentMethod: PaymentMethod) {
  const [form, setForm] = useState({
    isActive: paymentMethod.isActive,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      setCompanyDefaultPaymentMethod(form, Number(paymentMethod.id)),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Payment method set as default.");
    },
    onError: (error) => {
      toast.error(
        "Failed to set payment method to default! Error: " + error.message,
      );
    },
  });

  const updateStatus = () => {
    setForm({ isActive: true });
    mutation.mutate();
  };

  return { updateStatus };
}
