import { Job } from "../../../../../shared/types/job";

type JobDetailsProps = {
  resource: Job;
};

function JobDetails({ resource }: JobDetailsProps) {
  return (
    <>
      <h1 className="border-b-2 border-slate-300 py-4 text-lg font-medium xl:text-xl">
        Preview
      </h1>
      {resource.title ? (
        <>
          <div className="flex items-center justify-between border-b-2 border-slate-300 py-8">
            <div>
              <h2 className="text-2xl font-semibold 2xl:text-3xl">
                {resource.title}
              </h2>
              <p className="mt-2 font-medium text-slate-500">
                {resource.company.name}
              </p>
              <div className="mt-2 flex gap-2">
                {resource.locations.map((record, index) => {
                  if (typeof record === "object") {
                    return (
                      <p key={record.id} className="text-sm font-medium">
                        {record.city}, {record.code}
                      </p>
                    );
                  } else {
                    return <p key={index}>Location ID: {record}</p>;
                  }
                })}
                &#8226;
                <p className="text-sm font-medium">{resource.workPreference}</p>
                &#8226;
                <p className="text-sm font-medium">
                  {resource.isFulltime ? "Full Time" : "Part Time"}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-4 gap-4 py-8 xs:grid-cols-2 xs:grid-rows-2 xl:flex">
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Experience</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {resource.experience}{" "}
                {resource.experience !== 0 && resource.experience < 2
                  ? "Year"
                  : "Years"}{" "}
                of Experience
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Job Seniority</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {resource.seniority} Level
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Salary</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {resource.salaryFrom} - {resource.salaryTo}/
                {resource.isSalaryMonthly ? "Month" : "Year"}
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">Education</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                Bachelor's degree
              </p>
            </div>
          </div>
          {resource.positionOverview && (
            <div className="py-4">
              <h3 className="py-2 text-xl font-semibold">Overview</h3>
              <p>{resource.positionOverview}</p>
            </div>
          )}
          {resource.responsibilities && (
            <div className="py-4">
              <h3 className="py-2 text-xl font-semibold">Responsibilities</h3>
              <ul>
                {resource.responsibilities.map((record) => (
                  <li key={record.id} className="list-inside list-disc">
                    {record.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {resource.qualifications.length > 0 && (
            <div className="py-4">
              <h3 className="py-2 text-xl font-semibold">Qualifications</h3>
              <ul>
                {resource.qualifications.map((record) => (
                  <li key={record.id} className="list-inside list-disc">
                    {record.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="py-4">
            <h3 className="py-2 text-xl font-semibold">About Company</h3>
            <p>{resource?.company.description}</p>
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

export default JobDetails;
