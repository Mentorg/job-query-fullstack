import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../shared/services/apiJobs";

export function useGetJobs() {
  const {
    data: jobs,
    isPending,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => {
      return getJobs();
    },
  });

  return { jobs, isPending, error };
}
