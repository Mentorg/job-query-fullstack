import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCompanyPaymentMethod } from "../../../../shared/services/apiCompany";
import { PaymentMethod } from "../../../../shared/types/payment_method";

export function useDeletePaymentMethod(paymentMethod: PaymentMethod) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deleteCompanyPaymentMethod", paymentMethod.id],
    mutationFn: () => deleteCompanyPaymentMethod(Number(paymentMethod.id)),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Payment method data deleted successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to delete payment method data! Error: " + error.message,
      );
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return { handleDelete };
}
