import { useQuery } from "@tanstack/react-query";
import { getRecruiterApplications } from "../../shared/services/apiApplication";

export function useGetRecruiterApplications() {
  const {
    data: recruiterApplications,
    isPending,
    error,
  } = useQuery({
    queryKey: ["recruiterApplications"],
    queryFn: () => getRecruiterApplications(),
  });

  return { recruiterApplications, isPending, error };
}
