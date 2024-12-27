import { useQuery } from "@tanstack/react-query";
import { getUserCurrency } from "../../../../shared/services/apiUser";

export function useGetUserCurrency() {
  const {
    data: userCurrency,
    isPending,
    error,
  } = useQuery({
    queryKey: ["userCurrency"],
    queryFn: () => getUserCurrency(),
  });
  return { userCurrency, isPending, error };
}
