import { useQuery } from "@tanstack/react-query";
import { getRecruiterNotificationSettings } from "../../../../shared/services/apiUser";

export function useGetNotificationSettings() {
  const {
    data: userNotificationSettings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["userNotificationSettings"],
    queryFn: () => getRecruiterNotificationSettings(),
  });
  return {
    userNotificationSettings,
    isPending,
    error,
  };
}
