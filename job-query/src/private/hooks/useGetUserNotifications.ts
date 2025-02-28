import { useQuery } from "@tanstack/react-query";
import { getUserNotifications } from "../../shared/services/apiUser";

export function useGetUserNotifications() {
  const {
    data: userNotifications,
    isPending,
    error,
  } = useQuery({
    queryKey: ["userNotifications"],
    queryFn: () => getUserNotifications(),
  });

  return { userNotifications, isPending, error };
}
