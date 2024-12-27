import { useQuery } from "@tanstack/react-query";
import { getCompanyBillingSettings } from "../../../../shared/services/apiCompany";

export function useBillingSettings() {
  const {
    data: billingSettings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["billingSettings"],
    queryFn: () => getCompanyBillingSettings(),
  });

  return { billingSettings, isPending, error };
}
