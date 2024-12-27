import { useQuery } from "@tanstack/react-query";
import { getCompanyPaymentMethods } from "../../../../shared/services/apiCompany";

export function useGetCompanyPaymentMethods() {
  const {
    data: paymentMethods,
    isPending,
    error,
  } = useQuery({
    queryKey: ["getCompanyPaymentMethods"],
    queryFn: () => getCompanyPaymentMethods(),
  });

  return { paymentMethods, isPending, error };
}
