import { useQuery } from "@tanstack/react-query";
import { getRecruiter } from "../../../../shared/services/apiUser";

export function useGetRecruiter() {
  const {
    data: recruiter,
    isPending,
    error,
  } = useQuery({
    queryKey: ["recruiter"],
    queryFn: () => getRecruiter(),
  });
  return { recruiter, isPending, error };
}
