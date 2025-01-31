import { useTranslation } from "react-i18next";
import StatusChip from "../components/StatusChip";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useGetJob } from "../features/jobs/hooks/useGetJob";
import { Location } from "../../shared/types/location";
import { Competency } from "../../shared/types/job";
import { formatSalary } from "../../shared/utils/formatSalary";

function JobOverview() {
  const { job, isPending, error } = useGetJob();
  const { t } = useTranslation();

  return (
    <>
      {isPending ? (
        <Loading />
      ) : error ? (
        <Fallback
          errorType="fetch"
          message={error.message || t("system.serverError")}
        />
      ) : (
        <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
          <div className="flex flex-col items-start justify-between md:flex-row">
            <div className="flex flex-col gap-y-2 xs:flex-row">
              <div className="md:mt-4">
                <h1 className="text-2xl font-semibold 2xl:text-2xl">
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
                  <p className="text-sm font-medium">
                    {(job.workPreference === "On-site" && t("job.onSite")) ||
                      (job.workPreference === "Remote" && t("job.remote")) ||
                      (job.workPreference && t("job.hybrid"))}
                  </p>
                  &#8226;
                  <p className="text-sm font-medium">
                    {job.isFulltime ? t("job.fullTime") : t("job.partTime")}
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
              <h4 className="text-xl font-medium">{t("job.experience")}</h4>
              <p className="mt-2 font-medium text-slate-500">
                {t("job.experience", { count: job.experience })}
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">{t("job.seniority")}</h4>
              <p className="mt-2 font-medium text-slate-500">
                {(job.seniority === "Intern" && t("job.intern")) ||
                  (job.seniority === "Entry" && t("job.entry")) ||
                  (job.seniority === "Junior" && t("job.junior")) ||
                  (job.seniority === "Mid" && t("job.mid")) ||
                  (job.seniority === "Senior" && t("job.senior"))}
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">{t("job.salary")}</h4>
              <p className="mt-2 font-medium text-slate-500">
                {formatSalary(
                  job.salaryFrom,
                  job.salaryTo,
                  job.recruiter.currency.code,
                  job.recruiter.currency.symbol,
                )}{" "}
                /{" "}
                <span className="text-base">
                  {job.isSalaryMonthly
                    ? t("job.salaryMonthly")
                    : t("job.salaryAnnual")}
                </span>
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">{t("job.education")}</h4>
              <p className="mt-2 font-medium text-slate-500">
                {(job.education === "High school diploma" &&
                  t("job.highSchool")) ||
                  (job.education === "Bachelor's" && t("job.bachelor")) ||
                  (job.education === "Master's" && t("job.master")) ||
                  (job.education === "Ph.D." && t("job.phd"))}
              </p>
            </div>
          </div>
          {job.positionOverview && (
            <div className="py-2">
              <h3 className="text-xl font-semibold">{t("job.overview")}</h3>
              <p className="mt-2">{job.positionOverview}</p>
            </div>
          )}
          <div className="py-2">
            <h3 className="text-xl font-semibold">
              {t("job.responsibilities")}
            </h3>
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
            <h3 className="text-xl font-semibold">{t("job.qualifications")}</h3>
            <ul className="col-start-3 col-end-12 mt-2 lg:m-0">
              {job.qualifications.map((record: Competency) => (
                <li key={record.id} className="list-inside list-disc">
                  {record.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="py-2">
            <h3 className="text-xl font-semibold">{t("job.company")}</h3>
            <p className="mt-2">{job.company.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default JobOverview;
