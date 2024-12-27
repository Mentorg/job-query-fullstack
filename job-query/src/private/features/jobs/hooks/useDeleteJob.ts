import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteJob } from "../../../../shared/services/apiJobs";

export function useDeleteJob(id: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteJob", id],
    mutationFn: () => deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Job deleted successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to delete job advertisement! Error: " + error.message,
      );
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return { handleDelete };
}
