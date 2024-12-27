import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../../../../shared/services/apiSystem";

export function useCurrencies() {
  const {
    data: currencies,
    isPending,
    error,
  } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => {
      return getCurrencies();
    },
  });

  return { currencies, isPending, error };
}
