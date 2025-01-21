import { useTranslation } from "react-i18next";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import Chip from "../../../../../shared/components/ui/Chip";
import { formatDate } from "../../../../../shared/utils/dateFormat";
import { Job } from "../../../../../shared/types/job";
import { Company } from "../../../../../shared/types/company";

export type RecruiterAdsProps = {
  recruiterAds: Job[];
  company: Company;
};

function RecruiterAds({ recruiterAds, company }: RecruiterAdsProps) {
  const { t } = useTranslation();

  const avatarUrl =
    company.avatar !== null
      ? `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/${company.avatar}`
      : `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/default-logo.svg`;

  return (
    <>
      <h2 className="py-4 text-xl font-medium">{t("recruiter.jobsPosted")}</h2>
      {recruiterAds?.map((advertisement: Job) => (
        <div
          key={advertisement.id}
          className="mb-10 grid grid-cols-2 grid-rows-[1fr_1fr_auto] rounded-md border border-slate-300 px-5 py-6 sm:grid-cols-3 sm:grid-rows-[1fr_auto] sm:gap-y-4 md:grid-cols-5 md:grid-rows-1 lg:grid-cols-3 lg:grid-rows-[1fr_auto] xl:grid-cols-8 xl:grid-rows-1 xl:px-10"
        >
          <div className="flex-rowlgorder-1 order-1 col-start-1 col-end-3 row-start-1 row-end-1 flex md:col-start-1 md:col-end-3 md:row-start-1 lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-1 xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-1">
            <img
              src={avatarUrl}
              alt={`${company.name}'s logo`}
              className="h-20 w-20"
            />
            <div className="ml-4">
              <h2 className="text-lg font-medium">{advertisement.title}</h2>
              <p className="text-xs font-medium text-slate-500">
                {company.name}
              </p>
            </div>
          </div>
          <div className="order-2 col-start-1 col-end-1 row-start-2 row-end-2 flex flex-col justify-center md:col-start-3 md:col-end-3 md:row-start-1 lg:col-start-1 lg:col-end-1 lg:row-start-2 lg:row-end-2 xl:order-2 xl:col-start-4 xl:col-end-5 xl:row-start-1 xl:row-end-1">
            <h3 className="text-xs font-medium text-slate-500">
              {t("job.posted")}
            </h3>
            <p className="text-sm font-medium">
              {formatDate(advertisement.createdAt)}
            </p>
          </div>
          <div className="order-4 col-start-1 col-end-3 row-start-3 row-end-3 flex items-center gap-4 sm:col-start-2 sm:col-end-4 sm:row-start-2 sm:row-end-2 md:col-start-4 md:col-end-5 md:row-start-1 md:flex-col md:justify-evenly md:gap-0 lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-2 lg:flex-row xl:order-3 xl:col-start-5 xl:col-end-7 xl:row-start-1 xl:row-end-1">
            {advertisement.locations.map((record) => {
              if (
                typeof record === "object" &&
                "city" in record &&
                "code" in record
              ) {
                return (
                  <Chip
                    key={record.id}
                    className="flex w-fit items-center rounded-3xl bg-blue-500 px-3 py-1"
                    icon={<FaLocationDot className="text-white" />}
                  >
                    {record.city}, {record.code}
                  </Chip>
                );
              }
              return (
                <Chip
                  key={record}
                  className="flex w-fit items-center rounded-3xl bg-blue-500 px-3 py-1"
                  icon={<FaLocationDot className="text-white" />}
                >
                  Unknown location ID: {record}
                </Chip>
              );
            })}
            <Chip
              className="flex w-fit items-center rounded-3xl bg-red-500 px-3 py-1"
              icon={<FaClock className="text-white" />}
            >
              {advertisement.isFulltime ? t("job.fullTime") : t("job.partTime")}
            </Chip>
          </div>
          <div className="order-3 col-start-2 col-end-2 row-start-2 row-end-2 flex w-full items-center justify-center sm:col-start-3 sm:col-end-4 sm:row-start-1 md:col-start-5 md:col-end-6 xl:order-4 xl:col-start-7 xl:col-end-9 xl:row-start-1 xl:row-end-1">
            <IoIosLink className="text-blue-500" />
            <p className="ml-2 h-fit text-sm text-blue-600 transition-all">
              {company.website}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default RecruiterAds;
