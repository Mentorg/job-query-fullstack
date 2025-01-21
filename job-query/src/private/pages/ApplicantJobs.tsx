import { useTranslation } from "react-i18next";
import EmploymentContainer from "../components/EmploymentContainer";
import ViewOptions from "../components/ViewOptions";
import JobsGrid from "../features/jobs/components/ui/JobsGrid";
import JobsTable from "../features/jobs/components/ui/JobsTable";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useFilters } from "../hooks/useFilters";
import { useGetApplicantJobs } from "../features/jobs/hooks/useGetApplicantJobs";
import { useAuth } from "../../shared/context/AuthContext";

function ApplicantJobs() {
  const { gridView, sort, jobFilter, handleOrder, handleGridView } =
    useFilters();
  const { user } = useAuth();
  const { applicantJobs, isPending, error } = useGetApplicantJobs(
    user?.id ?? null,
  );
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <EmploymentContainer title={t("pageTitle.myJobs")}>
        {gridView && (
          <select
            value={sort}
            onChange={handleOrder}
            className={`rounded-md border-2 px-5 py-2`}
          >
            {Object.entries(jobFilter).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </select>
        )}
        <ViewOptions onClick={handleGridView} gridView={gridView} />
      </EmploymentContainer>
      {gridView ? (
        isPending ? (
          <Loading />
        ) : error ? (
          <Fallback
            errorType="fetch"
            message={error.message || t("system.serverError")}
          />
        ) : (
          <JobsGrid jobs={applicantJobs} sort={sort} />
        )
      ) : (
        <div className="w-[90dvw] lg:w-[65dvw] xl:w-[70dvw]">
          {isPending ? (
            <Loading />
          ) : error ? (
            <Fallback
              errorType="fetch"
              message={error.message || t("system.serverError")}
            />
          ) : (
            <JobsTable jobs={applicantJobs} />
          )}
        </div>
      )}
    </div>
  );
}

export default ApplicantJobs;
