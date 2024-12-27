import { useQuery } from "@tanstack/react-query";
import { getCompanyJobs } from "../../../../shared/services/apiCompany";

export function useGetCompanyJobs(id: number) {
  const {
    data: companyJobs,
    isPending,
    error,
  } = useQuery({
    queryKey: ["companyJobs", id],
    queryFn: () => getCompanyJobs(id),
  });
  return {
    companyJobs,
    isPending,
    error,
  };
}
