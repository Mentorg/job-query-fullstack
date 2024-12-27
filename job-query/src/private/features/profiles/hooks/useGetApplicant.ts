import { useQuery } from "@tanstack/react-query";
import { getApplicant } from "../../../../shared/services/apiUser";

export function useGetApplicant() {
  const {
    data: applicant,
    isPending,
    error,
  } = useQuery({
    queryKey: ["applicant"],
    queryFn: () => getApplicant(),
  });
  return { applicant, isPending, error };
}
