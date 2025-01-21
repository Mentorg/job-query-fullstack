import { useTranslation } from "react-i18next";
import { Job } from "../../../../../shared/types/job";
import StatusChip from "../../../../components/StatusChip";

type JobDetailsProps = {
  resource: Job;
};

function JobDetails({ resource }: JobDetailsProps) {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="border-b-2 border-slate-300 py-4 text-lg font-medium xl:text-xl">
        {t("job.preview")}
      </h1>
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
            <p className="text-sm font-medium">
              {(resource.workPreference === "On-site" && t("job.onSite")) ||
                (resource.workPreference === "Remote" && t("job.remote")) ||
                (resource.workPreference && t("job.hybrid"))}
            </p>
            &#8226;
            <p className="text-sm font-medium">
              {resource.isFulltime ? t("job.fullTime") : t("job.partTime")}
            </p>
          </div>
        </div>
        <div className="mt-4 xs:ml-5 sm:ml-10">
          <StatusChip>{resource.status}</StatusChip>
        </div>
      </div>
      <div className="grid grid-cols-1 grid-rows-4 gap-4 py-8 xs:grid-cols-2 xs:grid-rows-2 xl:flex">
        <div className="w-full rounded-md bg-slate-100 px-4 py-8">
          <h4 className="text-xl font-medium">{t("job.experience")}</h4>
          <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
            {t("job.experience", { count: resource.experience })}
          </p>
        </div>
        <div className="w-full rounded-md bg-slate-100 px-4 py-8">
          <h4 className="text-xl font-medium">{t("job.seniority")}</h4>
          <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
            {(resource.seniority === "Intern" && t("job.intern")) ||
              (resource.seniority === "Entry" && t("job.entry")) ||
              (resource.seniority === "Junior" && t("job.junior")) ||
              (resource.seniority === "Mid" && t("job.mid")) ||
              (resource.seniority === "Senior" && t("job.senior"))}
          </p>
        </div>
        <div className="w-full rounded-md bg-slate-100 px-4 py-8">
          <h4 className="text-xl font-medium">{t("job.salary")}</h4>
          <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
            {resource.salaryFrom} - {resource.salaryTo}/
            <span className="text-base">
              {resource.isSalaryMonthly
                ? t("job.salaryMonthly")
                : t("job.salaryAnnual")}
            </span>
          </p>
        </div>
        <div className="w-full rounded-md bg-slate-100 px-4 py-8">
          <h4 className="text-xl font-medium">{t("job.education")}</h4>
          <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
            {(resource.education === "High school diploma" &&
              t("job.highSchool")) ||
              (resource.education === "Bachelor's" && t("job.bachelor")) ||
              (resource.education === "Master's" && t("job.master")) ||
              (resource.education === "Ph.D." && t("job.phd"))}
          </p>
        </div>
      </div>
      {resource.positionOverview && (
        <div className="py-4">
          <h3 className="py-2 text-xl font-semibold">{t("job.overview")}</h3>
          <p>{resource.positionOverview}</p>
        </div>
      )}
      {resource.responsibilities && (
        <div className="py-4">
          <h3 className="py-2 text-xl font-semibold">
            {t("job.responsibilities")}
          </h3>
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
          <h3 className="py-2 text-xl font-semibold">
            {t("job.qualifications")}
          </h3>
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
        <h3 className="py-2 text-xl font-semibold">{t("job.company")}</h3>
        <p>{resource?.company.description}</p>
      </div>
    </>
  );
}

export default JobDetails;
