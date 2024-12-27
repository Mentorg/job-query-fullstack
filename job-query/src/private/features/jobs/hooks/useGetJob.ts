import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getJob } from "../../../../shared/services/apiJobs";

export function useGetJob() {
  const { id: jobId } = useParams();

  const {
    data: job,
    isPending,
    error,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob(Number(jobId)),
  });

  return { isPending, error, job };
}
