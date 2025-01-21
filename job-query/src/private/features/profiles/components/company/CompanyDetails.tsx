import { useTranslation } from "react-i18next";
import { IoIosLink } from "react-icons/io";
import Loading from "../../../../../shared/components/ui/Loading";
import Fallback from "../../../../../shared/components/ui/Fallback";
import { useGetCompanyJobs } from "../../hooks/useGetCompanyJobs";
import { useGetCompanyRecruiters } from "../../hooks/useGetCompanyRecruiters";
import { formatDate } from "../../../../../shared/utils/dateFormat";
import { Company } from "../../../../../shared/types/company";
import { Job } from "../../../../../shared/types/job";
import { User } from "../../../../../shared/types/user";

type CompanyDetailsProps = {
  resource: Company;
};

function CompanyDetails({ resource }: CompanyDetailsProps) {
  const {
    companyJobs,
    isPending: isPendingCompanyJobs,
    error: companyJobsError,
  } = useGetCompanyJobs(resource.id);
  const {
    companyRecruiters,
    isPending: isPendingCompanyRecruiters,
    error: companyRecruitersError,
  } = useGetCompanyRecruiters(resource.id);
  const { t } = useTranslation();

  let avatar;

  if (resource.avatar) {
    if (resource.avatar.includes("logos")) {
      avatar = `http://127.0.0.1:8000/storage/${resource.avatar}`;
    } else {
      avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/${resource.avatar}`;
    }
  } else {
    avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/default-logo.svg`;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-x-10 lg:flex-row">
        <div className="flex w-full flex-col items-center gap-4">
          <img
            src={avatar}
            alt={`${resource.name}'s avatar`}
            className="w-[4rem] rounded-full"
          />
          <h1 className="text-center text-2xl font-medium">{resource.name}</h1>
        </div>
      </div>
      <div className="py-5">
        <div className="text-xl font-medium">
          <h2>{t("company.companyInfo")}</h2>
        </div>
        <div className="my-8 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col">
            <p className="font-medium">{t("company.website")}</p>
            <p className="text-slate-700">{resource.website}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{t("company.email")}</p>
            <p className="text-slate-700">{resource.email}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{t("company.slug")}</p>
            <p className="text-slate-700">{resource.slug}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{t("company.phone")}</p>
            <p className="text-slate-700">{resource.phone}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{t("company.address")}</p>
            <p className="text-slate-700">{resource.address}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">{t("company.locations")}</p>
            <div className="flex flex-col">
              {resource.locations.map((record) => (
                <p key={record.id} className="text-slate-700">
                  {record.city}, {record.code}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="text-xl font-medium">
          <h3>{t("company.socialMedia")}</h3>
        </div>
        <div className="my-8 flex flex-col gap-2">
          <a
            href={`https://facebook.com/`}
            className="text-xs text-blue-700 transition-all hover:text-blue-500"
          >
            facebook.com/@{resource.facebook}
          </a>
          <a
            href={`https://twitter.com/`}
            className="text-xs text-blue-700 transition-all hover:text-blue-500"
          >
            twitter.com/@{resource.twitter}
          </a>
          <a
            href={`https://linkedin.com/`}
            className="text-xs text-blue-700 transition-all hover:text-blue-500"
          >
            linkedin.com/@{resource.linkedin}
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-center py-5">
        <div className="text-center text-xl font-medium">
          <h3>{t("company.recruiters")}</h3>
        </div>
        <div className="my-8 flex flex-col gap-2">
          <ul className="flex w-full justify-center gap-10">
            {isPendingCompanyRecruiters ? (
              <Loading />
            ) : companyRecruitersError ? (
              <Fallback
                errorType="fetch"
                message={
                  companyRecruitersError.message || t("system.serverError")
                }
              />
            ) : companyRecruiters.length > 0 ? (
              companyRecruiters.map((record: User) => (
                <li key={record.id}>
                  <img
                    src={
                      record.avatar
                        ? record.avatar.includes("avatars")
                          ? `http://127.0.0.1:8000/storage/${record.avatar}`
                          : `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${record.avatar}`
                        : `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-avatar.png`
                    }
                    alt="Recruiter's avatar"
                    className="w-fit"
                  />
                  <p className="mt-4 text-sm font-medium">{record.name}</p>
                </li>
              ))
            ) : (
              <p>{t("company.noRecruiters")}</p>
            )}
          </ul>
        </div>
      </div>
      <div className="py-5">
        <div className="text-center text-xl font-medium">
          <h3>{t("company.companyJobs")}</h3>
        </div>
        <div className="my-8 flex flex-col gap-2">
          <div className="flex w-full flex-col justify-center">
            {isPendingCompanyJobs ? (
              <Loading />
            ) : companyJobsError ? (
              <Fallback
                errorType="fetch"
                message={companyJobsError.message || t("system.serverError")}
              />
            ) : companyJobs.length > 0 ? (
              companyJobs.map((record: Job) => (
                <div
                  key={record.id}
                  className="my-6 flex flex-col justify-between gap-8 rounded-md border border-slate-300 px-5 py-6 sm:gap-y-4 md:flex-row md:gap-16 xl:px-10"
                >
                  <div className="flex flex-row items-center gap-4">
                    <img
                      src={avatar}
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
                        {t("company.posted")}
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
              <div className="flex w-full justify-center">
                <p>{t("company.noCompanyJobs")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyDetails;
