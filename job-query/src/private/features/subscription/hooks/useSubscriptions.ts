import { useQuery } from "@tanstack/react-query";
import { getSubscriptions } from "../../../../shared/services/apiSystem";

export function useSubscriptions() {
  const {
    data: subscriptions,
    isPending,
    error,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => {
      return getSubscriptions();
    },
  });

  return { subscriptions, isPending, error };
}
