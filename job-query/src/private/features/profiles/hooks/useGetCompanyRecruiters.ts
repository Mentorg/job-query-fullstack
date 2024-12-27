import { useQuery } from "@tanstack/react-query";
import { getCompanyRecruiters } from "../../../../shared/services/apiCompany";

export function useGetCompanyRecruiters(id: number) {
  const {
    data: companyRecruiters,
    isPending,
    error,
  } = useQuery({
    queryKey: ["companyRecruiters", id],
    queryFn: () => getCompanyRecruiters(id),
  });
  return {
    companyRecruiters,
    isPending,
    error,
  };
}
