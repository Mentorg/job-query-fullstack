import { useSearchParams, useNavigate } from "react-router-dom";

export function useSearchJobFormService() {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = (searchQuery: string) => {
    setSearchParams({ q: searchQuery });
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`, {
      state: searchQuery,
    });
  };

  return { search };
}
