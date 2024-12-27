import { useQuery } from "@tanstack/react-query";
import { getCompanyLocations } from "../../../../shared/services/apiCompany";

export function useCompanyLocation() {
  const {
    data: locations,
    isPending,
    error,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: () => getCompanyLocations(),
  });

  return { locations, isPending, error };
}
