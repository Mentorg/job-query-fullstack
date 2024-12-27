import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteUser } from "../../../../shared/services/apiUser";

export function useDeleteUser(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteUser", id],
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/");
      toast.success("User deleted successfully.");
    },
    onError: (error) => {
      toast.error("Failed to delete user! Error: " + error.message);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return { handleDelete };
}
