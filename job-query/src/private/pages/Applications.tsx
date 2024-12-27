import EmploymentContainer from "../components/EmploymentContainer";
import ApplicationsTable from "../features/applications/components/ApplicationsTable";
import ApplicationsGrid from "../features/applications/components/ApplicationsGrid";
import ViewOptions from "../components/ViewOptions";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useFilters } from "../hooks/useFilters";
import { useGetRecruiterApplications } from "../hooks/useGetRecruiterApplications";

function Applications() {
  const { gridView, sort, applicationFilter, handleOrder, handleGridView } =
    useFilters();
  const { recruiterApplications, isPending, error } =
    useGetRecruiterApplications();

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <EmploymentContainer title="Applications">
        {gridView && (
          <select
            value={sort}
            onChange={handleOrder}
            className={`rounded-md border-2 px-5 py-2`}
          >
            {Object.entries(applicationFilter).map(([key, value]) => (
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
            message={error.message || "Failed to load data"}
          />
        ) : (
          <ApplicationsGrid applications={recruiterApplications} sort={sort} />
        )
      ) : (
        <div className="w-[90dvw] lg:w-[65dvw] xl:w-[70dvw]">
          {isPending ? (
            <Loading />
          ) : error ? (
            <Fallback
              errorType="fetch"
              message={error.message || "Failed to load data"}
            />
          ) : (
            <ApplicationsTable applications={recruiterApplications} />
          )}
        </div>
      )}
    </div>
  );
}

export default Applications;
