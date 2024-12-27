import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createApplication } from "../../shared/services/apiJobs";
import { Job, JobApplicationPayload } from "../../shared/types/job";

export const useCreateApplication = (job: Job) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(
        `Your application for the ${job.title} has been submitted successfully.`,
      );
    },
    onError: (error) => {
      toast.error(
        `Failed to send application for the ${job.title}! Error: ` +
          error.message,
      );
    },
  });

  const handleApply = async () => {
    const payload: JobApplicationPayload = { status: "received", id: job.id };
    try {
      await mutation.mutateAsync(payload);
      console.log("Submission successful.", payload);
    } catch (error) {
      console.error("Creating application failed!", error);
    }
  };

  return { handleApply };
};
