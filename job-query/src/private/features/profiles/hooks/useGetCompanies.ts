import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../../../shared/services/apiCompany";

export function useGetCompanies() {
  const {
    data: companies,
    isPending,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: () => {
      return getCompanies();
    },
  });

  return { companies, isPending, error };
}
