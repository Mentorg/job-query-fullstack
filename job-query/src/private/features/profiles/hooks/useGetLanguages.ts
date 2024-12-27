import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../../../../shared/services/apiSystem";

export function useGetLanguages() {
  const {
    data: languages,
    isPending,
    error,
  } = useQuery({
    queryKey: ["languages"],
    queryFn: () => {
      return getLanguages();
    },
  });

  return { languages, isPending, error };
}
