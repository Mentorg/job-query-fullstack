import { useQuery } from "@tanstack/react-query";
import { getCompanySubscription } from "../../../../shared/services/apiCompany";

export function useGetCompanySubscriptionPlan() {
  const {
    data: companySubscriptionPlan,
    isPending,
    error,
  } = useQuery({
    queryKey: ["companySubscription"],
    queryFn: () => getCompanySubscription(),
  });
  return {
    companySubscriptionPlan,
    isPending,
    error,
  };
}
