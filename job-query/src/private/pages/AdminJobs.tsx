import { useTranslation } from "react-i18next";
import JobsTable from "../features/jobs/components/ui/JobsTable";
import Fallback from "../../shared/components/ui/Fallback";
import Loading from "../../shared/components/ui/Loading";
import { useGetJobs } from "../../public/hooks/useGetJobs";

function AdminJobs() {
  const { jobs, isPending, error } = useGetJobs();
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center sm:gap-y-0">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-2xl">
          {t("pageTitle.jobs")}
        </h1>
      </div>
      <div>
        {isPending ? (
          <Loading />
        ) : error ? (
          <Fallback
            errorType="fetch"
            message={error.message || t("system.serverError")}
          />
        ) : (
          <JobsTable jobs={jobs} />
        )}
      </div>
    </div>
  );
}

export default AdminJobs;
