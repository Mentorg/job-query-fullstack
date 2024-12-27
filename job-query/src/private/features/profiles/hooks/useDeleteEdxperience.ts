import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../../shared/context/AuthContext";
import { deleteApplicantExperience } from "../../../../shared/services/apiUser";
import { Experience } from "../../../../shared/types/experience";

export function useDeleteExperience(experienceData: Experience) {
  const { user } = useAuth();
  const applicantId = user?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteApplicantExperience", applicantId, experienceData.id],
    mutationFn: () =>
      deleteApplicantExperience(Number(applicantId), Number(experienceData.id)),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Experience data deleted successfully.");
    },
    onError: (error) => {
      toast.error("Failed to delete experience data! Error: " + error.message);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return { handleDelete };
}
