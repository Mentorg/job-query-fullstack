import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaLocationDot } from "react-icons/fa6";
import { BsFiletypePdf } from "react-icons/bs";
import Chip from "../../../../shared/components/ui/Chip";
import StatusChip from "../../../components/StatusChip";
import Button from "../../../../shared/components/ui/Button";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { formatDate } from "../../../../shared/utils/dateFormat";
import { DetailedApplication } from "../../../../shared/types/application";

type ApplicationDetailsProps = {
  application: DetailedApplication;
};

function ApplicationDetails({ application }: ApplicationDetailsProps) {
  const { updateStatus } = useUpdateApplicationStatus(application);
  const { t } = useTranslation();

  const avatarUrl = application.applicant.user?.avatar
    ? `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${application.applicant.user?.avatar}`
    : `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-avatar.png`;

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-x-10 lg:flex-row">
        <div className="flex w-full flex-row gap-4">
          <img
            src={avatarUrl}
            alt="Applicant's avatar"
            className="h-fit w-fit"
          />
          <div className="flex flex-col gap-y-2 xs:flex-row md:mx-4">
            <div className="flex w-max flex-col">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">
                  {application.applicant.user?.name}
                </h1>
                <div className="xs:ml-4">
                  <StatusChip>{application?.status}</StatusChip>
                </div>
              </div>
              <div>
                <p className="w-min whitespace-nowrap text-sm text-slate-500">
                  {t("application.appliedFor")}
                </p>
                <span className="font-medium text-primary">
                  {application?.job.title}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 flex h-fit w-full items-end gap-4 lg:justify-end">
          <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
            <select
              value={application?.status}
              onChange={(e) => updateStatus(e.target.value)}
              className={`rounded-md border-2 px-5 py-2`}
            >
              {["interview", "onHold", "shortlisted", "rejected"].map(
                (item: string) => (
                  <option value={item} key={item}>
                    {t(`application.status.${item}`)}
                  </option>
                ),
              )}
            </select>
          </div>
          <NavLink
            to="/dashboard/messages/newMessage"
            className="h-fit rounded-md border-2 border-blue-500 bg-blue-500 px-6 py-2 text-sm font-medium text-white"
          >
            {t("button.contact")}
          </NavLink>
        </div>
      </div>
      <div className="py-5">
        <h2 className="text-xl font-medium">{t("application.personalInfo")}</h2>
        <div className="flex flex-col gap-x-8 gap-y-8 py-8 sm:grid sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
          <div className="flex w-max flex-col">
            <h3 className="whitespace-nowrap font-medium">
              {t("application.applicationDate")}
            </h3>
            <p className="mt-2 text-sm">{formatDate(application.createdAt)}</p>
          </div>
          <div className="flex w-max flex-col">
            <h3 className="whitespace-nowrap font-medium">
              {t("application.email")}
            </h3>
            <p className="mt-2 text-sm">{application?.applicant.user.email}</p>
          </div>
          <div className="flex w-max flex-col">
            <h3 className="whitespace-nowrap font-medium">
              {t("application.phone")}
            </h3>
            <p className="mt-2 text-sm">{application?.applicant.user.phone}</p>
          </div>
          <div className="flex w-max flex-col">
            <h3 className="whitespace-nowrap font-medium">
              {t("application.location")}
            </h3>
            <p className="mt-2 text-sm">
              {application.applicant.user.location.city},{" "}
              {application.applicant.user.location.country}
            </p>
          </div>
        </div>
      </div>
      <div className="py-5">
        <h2 className="text-xl font-medium">{t("application.resume")}</h2>
        <div className="flex w-full flex-col justify-between gap-y-4 py-8 sm:flex-row sm:items-center sm:gap-y-0">
          <div className="flex items-center">
            <BsFiletypePdf className="h-[1.5rem] w-[1.5rem] text-blue-500" />
            <h3 className="ml-2 font-medium text-blue-500">
              {application?.resume}
            </h3>
          </div>
          <div className="flex flex-col">
            <Button
              // onClick={handleDownloadResume}
              className="rounded-md bg-primary px-6 py-2 text-white"
            >
              {t("button.download")}
            </Button>
          </div>
        </div>
      </div>
      <div className="py-5">
        <h2 className="text-xl font-medium">{t("application.experience")}</h2>
        <div className="flex w-full flex-col gap-5 py-8">
          {application.applicant.experiences.map((experience) => (
            <div
              key={experience.id}
              className="grid grid-cols-1 grid-rows-3 items-center bg-slate-100 px-4 py-2 sm:grid-cols-3 sm:grid-rows-1 md:px-6 md:py-4"
            >
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-lg font-medium md:text-xl">
                  {experience.title}
                </h3>
                <p className="mt-2 text-xs font-semibold text-slate-600">
                  {experience.company}
                </p>
              </div>
              <div className="flex justify-center">
                <h3 className="text-sm font-medium md:text-base">
                  {formatDate(experience.dateStart)} -{" "}
                  {formatDate(experience.dateEnd)}
                </h3>
              </div>
              <div className="flex justify-center sm:justify-end">
                <Chip
                  icon={<FaLocationDot className="text-white" />}
                  className="flex w-fit items-center rounded-3xl bg-blue-500 px-3 py-1"
                >
                  {experience.location.city}, {experience.location.country}
                </Chip>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-5">
        <h2 className="text-xl font-medium">{t("application.education")}</h2>
        <div className="flex w-full flex-col gap-5 py-8">
          {application.applicant.educations.map((education) => (
            <div
              key={education.id}
              className="grid grid-cols-2 grid-rows-3 items-center bg-slate-100 p-4 xs:gap-y-4 sm:px-8 sm:py-6 md:grid-cols-8 md:grid-rows-2 xl:grid-cols-10 xl:grid-rows-1 2xl:gap-x-2"
            >
              <div className="col-start-1 col-end-3 flex flex-col md:col-start-1 md:col-end-9 md:row-start-1 md:row-end-1 xl:col-start-1 xl:col-end-6">
                <h3 className="text-xl font-medium">{education?.degree}</h3>
                <p className="mt-2 text-xs font-semibold text-slate-400">
                  {education?.department} - {education?.university}
                </p>
              </div>
              <div className="flex flex-col justify-center md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-2 xl:col-start-6 xl:col-end-7 xl:row-start-1 xl:items-center">
                <p className="text-xs font-semibold text-slate-400">
                  {t("application.date")}
                </p>
                <h3 className="mt-2 font-medium">
                  {formatDate(education?.dateStart)} -{" "}
                  {formatDate(education?.dateEnd)}
                </h3>
              </div>
              <div className="flex flex-col justify-center md:col-start-3 md:col-end-3 md:row-start-2 md:row-end-2 xl:col-start-7 xl:col-end-8 xl:row-start-1 xl:items-center">
                <p className="text-xs font-semibold text-slate-400">
                  {t("application.gpa")}
                </p>
                <h3 className="mt-2 font-medium">{education?.gpa}</h3>
              </div>
              <div className="col-start-1 col-end-3 flex flex-col justify-center md:col-start-4 md:col-end-9 md:row-start-2 md:row-end-2 xl:col-start-8 xl:col-end-11 xl:row-start-1 xl:items-center">
                <p className="text-xs font-semibold text-slate-400">
                  {t("application.honors")}
                </p>
                <h3 className="mt-2 font-medium">{education?.honors}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-around gap-4 py-5 md:flex-row">
        <div className="flex w-full flex-col gap-5 py-8">
          <h2 className="text-xl font-medium">{t("application.skills")}</h2>
          <div className="flex flex-wrap gap-2">
            {application?.applicant.skills.map((record) => (
              <p
                key={record.id}
                className="h-fit w-max rounded-md bg-primary px-6 py-2 text-xs text-white"
              >
                {record.description}
              </p>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 py-8">
          <h2 className="text-xl font-medium">{t("application.languages")}</h2>
          <div className="flex flex-wrap gap-2">
            {application?.applicant.languages.map((record) => (
              <p
                key={record.id}
                className="h-fit w-max rounded-md bg-primary px-6 py-2 text-xs text-white"
              >
                {record.description}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="py-5">
        <h2 className="text-xl font-medium">{t("application.note")}</h2>
        <div className="flex w-full flex-col gap-5 py-8">
          {application.note ? (
            <p>{application.note}</p>
          ) : (
            <p>{t("application.noNotes")}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ApplicationDetails;
