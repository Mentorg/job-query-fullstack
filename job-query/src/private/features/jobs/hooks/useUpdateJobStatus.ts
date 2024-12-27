import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateJobStatus } from "../../../../shared/services/apiJobs";

type FormState = {
  status: string;
};

export function useUpdateJobStatus(job: { status: string; id: number }) {
  const [form, setForm] = useState<FormState>({
    status: job.status ?? "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      updateJobStatus({ status: form.status, id: job.id }, job.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Job status updated successfully.");
    },
    onError: (error) => {
      toast.error("Failed to update job status! Error: " + error.message);
    },
  });

  const updateStatus = (newStatus: string) => {
    setForm({ status: newStatus });
    mutation.mutate();
  };

  return { updateStatus };
}
