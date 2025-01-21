import { useTranslation } from "react-i18next";
import { IoIosLink } from "react-icons/io";
import Loading from "../../../../../shared/components/ui/Loading";
import Fallback from "../../../../../shared/components/ui/Fallback";
import { useGetApplicantJobs } from "../../../jobs/hooks/useGetApplicantJobs";
import { formatDate } from "../../../../../shared/utils/dateFormat";
import { Job } from "../../../../../shared/types/job";
import { User } from "../../../../../shared/types/user";

type ApplicantJobHistoryProps = {
  resource: User;
};

function ApplicantJobHistory({ resource }: ApplicantJobHistoryProps) {
  const { applicantJobs, isPending, error } = useGetApplicantJobs(resource.id);
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
      ) : applicantJobs.length > 0 ? (
        applicantJobs.map((record: Job) => (
          <div
            key={record.id}
            className="my-6 flex flex-col justify-between gap-8 rounded-md border border-slate-300 px-5 py-6 sm:gap-y-4 md:flex-row md:gap-16 xl:px-10"
          >
            <div className="flex flex-row items-center gap-4">
              <img
                src={
                  record.company.avatar
                    ? `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/${record.company.avatar}`
                    : `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/default-logo`
                }
                alt={`${record.company.name}'s logo`}
                className="h-20 w-20"
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-medium">{record.title}</h2>
                <p className="text-xs font-medium text-slate-500">
                  {record.company.name}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-xs font-medium text-slate-500">
                  {t("user.posted")}
                </h3>
                <p className="text-sm font-medium">
                  {formatDate(record.createdAt)}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <IoIosLink className="text-blue-500" />
                <p className="ml-2 h-fit text-sm text-blue-600 transition-all">
                  {record.company.website}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2>{t("job.noJobs")}</h2>
      )}
    </>
  );
}

export default ApplicantJobHistory;
