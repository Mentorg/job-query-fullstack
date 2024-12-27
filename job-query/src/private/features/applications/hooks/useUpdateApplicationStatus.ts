import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateApplicationStatus } from "../../../../shared/services/apiApplication";
import { DetailedApplication } from "../../../../shared/types/application";

export function useUpdateApplicationStatus(application: DetailedApplication) {
  const [status, setStatus] = useState({
    status: application.status,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => updateApplicationStatus(status, application.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Application status updated successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to update application status! Error: " + error.message,
      );
    },
  });

  const updateStatus = (newStatus: string) => {
    setStatus({ status: newStatus });
    mutation.mutate();
  };

  return { updateStatus };
}
