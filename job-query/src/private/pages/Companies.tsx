import Fallback from "../../shared/components/ui/Fallback";
import Loading from "../../shared/components/ui/Loading";
import CompaniesTable from "../features/profiles/components/company/CompaniesTable";
import { useGetCompanies } from "../features/profiles/hooks/useGetCompanies";

function Companies() {
  const { companies, isPending, error } = useGetCompanies();

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center sm:gap-y-0">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-2xl">
          Companies
        </h1>
      </div>
      <div>
        {isPending ? (
          <Loading />
        ) : error ? (
          <Fallback
            errorType="fetch"
            message={error.message || "Failed to load data"}
          />
        ) : (
          <CompaniesTable companies={companies} />
        )}
      </div>
    </div>
  );
}

export default Companies;
