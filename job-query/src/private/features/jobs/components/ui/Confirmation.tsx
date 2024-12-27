import { useCompanyLocation } from "../../hooks/useCompanyLocation";
import Loading from "../../../../../shared/components/ui/Loading";
import { useGetRecruiter } from "../../../profiles/hooks/useGetRecruiter";
import { Location } from "../../../../../shared/types/location";
import { CreateJob } from "../../../../../shared/types/job";

type ConfirmationProps = {
  form: CreateJob;
};

function Confirmation({ form }: ConfirmationProps) {
  const {
    locations,
    isPending: isPendingLocations,
    error: locationsError,
  } = useCompanyLocation();
  const {
    recruiter,
    isPending: isPendingRecruiter,
    error: recruiterError,
  } = useGetRecruiter();

  if (isPendingLocations || isPendingRecruiter) return <Loading />;

  if (locationsError instanceof Error || recruiterError instanceof Error)
    return <div>Error fetching data!</div>;

  const [location] = form.locations.map((id) =>
    locations.find((location: Location) => location.id === id),
  );

  return (
    <>
      <h1 className="border-b-2 border-slate-300 py-4 text-lg font-medium xl:text-xl">
        Preview
      </h1>
      {form.title ? (
        <>
          <div className="flex items-center justify-between border-b-2 border-slate-300 py-8">
            <div>
              <h2 className="text-2xl font-semibold 2xl:text-3xl">
                {form.title}
              </h2>
              <p className="mt-2 font-medium text-slate-500">
                {recruiter?.company.name}
              </p>
              <div className="mt-2 flex gap-2">
                <p className="text-sm font-medium">
                  {location.city}, {location.code}
                </p>
                &#8226;
                <p className="text-sm font-medium">{form.workPreference}</p>
                &#8226;
                <p className="text-sm font-medium">
                  {form.isFulltime ? "Full Time" : "Part Time"}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-4 gap-4 py-8 xs:grid-cols-2 xs:grid-rows-2 xl:flex">
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Experience</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {form.experience}{" "}
                {form.experience !== 0 && form.experience < 2
                  ? "Year"
                  : "Years"}{" "}
                of Experience
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Job Seniority</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {form.seniority} Level
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Salary</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {form.salaryFrom} - {form.salaryTo}/
                {form.isSalaryMonthly ? "Month" : "Year"}
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Education</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                Bachelor's degree
              </p>
            </div>
          </div>
          {form.positionOverview && (
            <div className="py-4">
              <h3 className="py-2 text-xl font-semibold">Overview</h3>
              <p>{form.positionOverview}</p>
            </div>
          )}
          {form.responsibilities && (
            <div className="py-4">
              <h3 className="py-2 text-xl font-semibold">Responsibilities</h3>
              <ul>
                {form.responsibilities.map((record, index) => (
                  <li key={index} className="list-inside list-disc">
                    {record}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {form.qualifications.length > 0 && (
            <div className="py-4">
              <h3 className="py-2 text-xl font-semibold">Qualifications</h3>
              <ul>
                {form.qualifications.map((record, index) => (
                  <li key={index} className="list-inside list-disc">
                    {record}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="py-4">
            <h3 className="py-2 text-xl font-semibold">About Company</h3>
            <p>{recruiter?.company.description}</p>
          </div>
        </>
      ) : (
        <div className="my-8">
          <h2 className="font-semibold">
            Form has not been filled completely!
          </h2>
        </div>
      )}
    </>
  );
}

export default Confirmation;
