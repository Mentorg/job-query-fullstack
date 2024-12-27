import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompany } from "../../../../shared/services/apiCompany";
import toast from "react-hot-toast";

export function useDeleteCompany(id: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteCompany", id],
    mutationFn: () => deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Company deleted successfully.");
    },
    onError: (error) => {
      toast.error("Failed to delete company! Error: " + error.message);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return { handleDelete };
}
