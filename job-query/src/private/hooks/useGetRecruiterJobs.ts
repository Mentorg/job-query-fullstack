import { useQuery } from "@tanstack/react-query";
import { getJobsByRecruiter } from "../../shared/services/apiJobs";

export function useGetRecruiterJobs(id: number) {
  const {
    data: recruiterJobs,
    isPending,
    error,
  } = useQuery({
    queryKey: ["recruiterJobs", id],
    queryFn: () => getJobsByRecruiter(id),
  });

  return { recruiterJobs, isPending, error };
}
