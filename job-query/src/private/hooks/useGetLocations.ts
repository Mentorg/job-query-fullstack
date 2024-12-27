import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../../shared/services/apiSystem";

export function useGetLocations() {
  const {
    data: locations,
    isPending,
    error,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: () => {
      return getLocations();
    },
  });

  return { locations, isPending, error };
}
