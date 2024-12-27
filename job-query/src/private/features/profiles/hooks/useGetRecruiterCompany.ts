import { useQuery } from "@tanstack/react-query";
import { getRecruiterCompany } from "../../../../shared/services/apiUser";

export function useGetRecruiterCompany() {
  const {
    data: recruiterCompany,
    isPending,
    error,
  } = useQuery({
    queryKey: ["recruiterCompany"],
    queryFn: () => getRecruiterCompany(),
  });
  return { recruiterCompany, isPending, error };
}
