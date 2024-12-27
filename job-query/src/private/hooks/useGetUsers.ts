import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../shared/services/apiUser";

export function useGetUsers() {
  const {
    data: users,
    isPending,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUsers();
    },
  });

  return { users, isPending, error };
}
