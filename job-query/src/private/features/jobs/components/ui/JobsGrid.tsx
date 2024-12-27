import JobCell from "./JobCell";
import Menus from "../../../../context/Menus";
import { Job } from "../../../../../shared/types/job";

type JobsGridProps = {
  jobs: Job[];
  sort: string;
};

function JobsGrid({ jobs, sort }: JobsGridProps) {
  const sortedJobs = [...jobs].sort((a, b) => {
    switch (sort) {
      case "date-desc":
        return b.createdAt.localeCompare(a.createdAt);
      case "date-asc":
        return a.createdAt.localeCompare(b.createdAt);
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "status-filled":
        return a.status === "filled" ? -1 : b.status === "filled" ? 1 : 0;
      case "status-open":
        return a.status === "open" ? -1 : b.status === "open" ? 1 : 0;
      default:
        return 0;
    }
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <Menus>
        {sortedJobs.length > 0 ? (
          sortedJobs.map((job) => <JobCell job={job as Job} key={job.id} />)
        ) : (
          <h2>No jobs available</h2>
        )}
      </Menus>
    </div>
  );
}

export default JobsGrid;
