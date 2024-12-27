import Hero from "../layouts/Hero";
import JobAdvertisement from "../components/JobAdvertisement";
import Button from "../../shared/components/ui/Button";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useGetJobs } from "../hooks/useGetJobs";
import { Job } from "../../shared/types/job";
import { useState } from "react";

function Home() {
  const jobPerGroup = 8;
  const [next, setNext] = useState(jobPerGroup);
  const { jobs, isPending, error } = useGetJobs();

  const loadMore = () => setNext(next + jobPerGroup);

  return (
    <>
      <Hero />
      <main className="h-full w-full bg-slate-100 py-10">
        <div className="container mx-auto px-4">
          {isPending ? (
            <Loading />
          ) : error ? (
            <Fallback
              errorType="fetch"
              message={error.message || "Failed to load data"}
            />
          ) : (
            jobs
              .slice(0, next)
              .map((job: Job) => <JobAdvertisement key={job.id} job={job} />)
          )}
          <div className="flex justify-center">
            {next < jobs?.length && (
              <Button
                onClick={loadMore}
                className="mt-4 rounded-md bg-slate-300 px-8 py-2 text-sm font-medium text-white transition-all hover:bg-slate-400"
              >
                Load More
              </Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
