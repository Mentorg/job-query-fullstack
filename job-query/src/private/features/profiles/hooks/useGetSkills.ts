import { useQuery } from "@tanstack/react-query";
import { getSkills } from "../../../../shared/services/apiSystem";

export function useGetSkills() {
  const {
    data: skills,
    isPending,
    error,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: () => {
      return getSkills();
    },
  });

  return { skills, isPending, error };
}
