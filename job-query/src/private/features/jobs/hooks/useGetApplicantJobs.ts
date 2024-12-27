import { useQuery } from "@tanstack/react-query";
import { getApplicantJobs } from "../../../../shared/services/apiJobs";

export function useGetApplicantJobs(id: number | null) {
  const {
    data: applicantJobs,
    isPending,
    error,
  } = useQuery({
    queryKey: ["applicantJobs", id],
    queryFn: () => {
      if (id === null) {
        return [];
      }
      return getApplicantJobs(id);
    },
    enabled: id !== null,
  });

  return {
    applicantJobs,
    isPending,
    error,
  };
}
