import { useTranslation } from "react-i18next";
import Loading from "../../../../../shared/components/ui/Loading";
import { useCompanyLocation } from "../../hooks/useCompanyLocation";
import { useGetRecruiter } from "../../../profiles/hooks/useGetRecruiter";
import { Location } from "../../../../../shared/types/location";
import { CreateJob } from "../../../../../shared/types/job";
import { formatSalary } from "../../../../../shared/utils/formatSalary";

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
  const { t } = useTranslation();

  if (isPendingLocations || isPendingRecruiter) return <Loading />;

  if (locationsError instanceof Error || recruiterError instanceof Error)
    return <div>{t("system.serverError")}</div>;

  const [location] = form.locations.map((id) =>
    locations.find((location: Location) => location.id === id),
  );

  return (
    <>
      <h1 className="border-b-2 border-slate-300 py-4 text-lg font-medium xl:text-xl">
        {t("job.preview")}
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
                <p className="text-sm font-medium">
                  {(form.workPreference === "On-site" && t("job.onSite")) ||
                    (form.workPreference === "Remote" && t("job.remote")) ||
                    (form.workPreference && t("job.hybrid"))}
                </p>
                &#8226;
                <p className="text-sm font-medium">
                  {form.isFulltime ? t("job.fullTime") : t("job.partTime")}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-4 gap-4 py-8 xs:grid-cols-2 xs:grid-rows-2 xl:flex">
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">
                {t("job.experience", { count: form.experience })}
              </h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {t(
                  Number(form.experience) === 1
                    ? "job.experience_one"
                    : "job.experience_other",
                  {
                    count: Number(form.experience),
                  },
                )}
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">{t("job.seniority")}</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {(form.seniority === "intern" && t("job.intern")) ||
                  (form.seniority === "entry" && t("job.entry")) ||
                  (form.seniority === "junior" && t("job.junior")) ||
                  (form.seniority === "mid" && t("job.mid")) ||
                  (form.seniority === "senior" && t("job.senior"))}
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">{t("job.salary")}</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {formatSalary(
                  form.salaryFrom,
                  form.salaryTo,
                  recruiter.currency.code,
                  recruiter.currency.symbol,
                )}{" "}
                /{" "}
                {form.isSalaryMonthly
                  ? t("job.salaryMonthly")
                  : t("job.salaryAnnual")}
              </p>
            </div>
            <div className="w-full rounded-md bg-slate-100 px-4 py-8">
              <h4 className="text-xl font-medium">{t("job.education")}</h4>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-base">
                {(form.education === "highSchool" && t("job.highSchool")) ||
                  (form.education === "bachelor" && t("job.bachelor")) ||
                  (form.education === "master" && t("job.master")) ||
                  (form.education === "phd" && t("job.phd"))}
              </p>
            </div>
          </div>
          {form.positionOverview && (
            <div className="py-4">
              <h3 className="py-2 text-xl font-semibold">
                {t("job.overview")}
              </h3>
              <p>{form.positionOverview}</p>
            </div>
          )}
          {form.responsibilities && (
            <div className="py-4">
              <h3 className="py-2 text-xl font-semibold">
                {t("job.responsibilities")}
              </h3>
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
              <h3 className="py-2 text-xl font-semibold">
                {t("job.qualifications")}
              </h3>
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
            <h3 className="py-2 text-xl font-semibold">{t("job.company")}</h3>
            <p>{recruiter?.company.description}</p>
          </div>
        </>
      ) : (
        <div className="my-8">
          <h2 className="font-semibold">{t("job.formIncomplete")}</h2>
        </div>
      )}
    </>
  );
}

export default Confirmation;
