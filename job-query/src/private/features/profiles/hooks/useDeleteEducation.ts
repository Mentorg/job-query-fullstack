import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../../shared/context/AuthContext";
import { deleteApplicantEducation } from "../../../../shared/services/apiUser";
import { Education } from "../../../../shared/types/education";

export function useDeleteEducation(educationData: Education) {
  const { user } = useAuth();
  const applicantId = user?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteApplicantEducation", applicantId, educationData.id],
    mutationFn: () =>
      deleteApplicantEducation(Number(applicantId), Number(educationData.id)),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Education data deleted successfully.");
    },
    onError: (error) => {
      toast.error("Failed to delete education data! Error: " + error.message);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return { handleDelete };
}
