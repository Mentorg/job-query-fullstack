import StatusChip from "../components/StatusChip";
import { useGetJob } from "../features/jobs/hooks/useGetJob";
import Loading from "../../shared/components/ui/Loading";
import { Location } from "../../shared/types/location";
import { Competency } from "../../shared/types/job";
import Fallback from "../../shared/components/ui/Fallback";

function JobOverview() {
  const { job, isPending, error } = useGetJob();

  return (
    <>
      {isPending ? (
        <Loading />
      ) : error ? (
        <Fallback
          errorType="fetch"
          message={error.message || "Failed to load data"}
        />
      ) : (
        <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
          <div className="flex flex-col items-start justify-between md:flex-row">
            <div className="flex flex-col gap-y-2 xs:flex-row">
              <div className="md:mt-4">
                <h1 className="text-2xl font-semibold 2xl:text-3xl">
                  {job.title}
                </h1>
                <p className="font-medium text-slate-500">{job.company.name}</p>
                <div className="mt-2 flex gap-2">
                  {job.locations.map((record: Location) => (
                    <p key={record.id} className="text-sm font-medium">
                      {record.city}, {record.code}
                    </p>
                  ))}
                  &#8226;
                  <p className="text-sm font-medium">{job.workPreference}</p>
                  &#8226;
                  <p className="text-sm font-medium">
                    {job.isFulltime ? "Full Time" : "Part Time"}
                  </p>
                </div>
              </div>
              <div className="mt-4 xs:ml-5 sm:ml-10">
                <StatusChip>{job.status}</StatusChip>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-4 gap-4 py-8 xs:grid-cols-2 xs:grid-rows-2 xl:flex">
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Experience</h4>
              <p className="mt-2 font-medium text-slate-500">
                {job.experience}{" "}
                {job.experience !== 0 && job.experience < 2 ? "Year" : "Years"}{" "}
                of Experience
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Job Seniority</h4>
              <p className="mt-2 font-medium text-slate-500">
                {job.seniority} Level
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Salary</h4>
              <p className="mt-2 font-medium text-slate-500">
                {job.salaryFrom} - {job.salaryTo}/
                {job.isSalaryMonthly ? "Monthly" : "Annual"}
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Education</h4>
              <p className="mt-2 font-medium text-slate-500">
                {job.education} degree
              </p>
            </div>
          </div>
          {job.positionOverview && (
            <div className="py-2">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="mt-2">{job.positionOverview}</p>
            </div>
          )}
          <div className="py-2">
            <h3 className="text-xl font-semibold">Responsibilities</h3>
            <ul>
              <ul className="col-start-3 col-end-12 mt-2 lg:m-0">
                {job.responsibilities.map((record: Competency) => (
                  <li key={record.id} className="list-inside list-disc">
                    {record.description}
                  </li>
                ))}
              </ul>
            </ul>
          </div>
          <div className="py-2">
            <h3 className="text-xl font-semibold">Qualifications</h3>
            <ul className="col-start-3 col-end-12 mt-2 lg:m-0">
              {job.qualifications.map((record: Competency) => (
                <li key={record.id} className="list-inside list-disc">
                  {record.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="py-2">
            <h3 className="text-xl font-semibold">About Company</h3>
            <p className="mt-2">{job.company.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default JobOverview;
