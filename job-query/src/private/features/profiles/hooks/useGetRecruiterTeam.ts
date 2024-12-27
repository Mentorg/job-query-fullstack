import { useQuery } from "@tanstack/react-query";
import { getRecruiterTeam } from "../../../../shared/services/apiUser";

export function useGetRecruiterTeam() {
  const {
    data: recruiterTeam,
    isPending,
    error,
  } = useQuery({
    queryKey: ["recruiterTeam"],
    queryFn: () => getRecruiterTeam(),
  });
  return { recruiterTeam, isPending, error };
}
