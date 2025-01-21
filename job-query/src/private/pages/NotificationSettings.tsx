import { useTranslation } from "react-i18next";
import NotificationSetting from "../features/settings/components/NotificationSetting";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useGetNotificationSettings } from "../features/settings/hooks/useGetNotificationSettings";

function NotificationSettings() {
  const { userNotificationSettings, isPending, error } =
    useGetNotificationSettings();
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
        <div className="mt-10 w-full xl:w-[75%]">
          <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
            <div className="flex flex-[1] flex-col">
              <h3 className="font-medium">
                {t("setting.notifications.jobAlerts")}
              </h3>
            </div>
            <div className="flex flex-[2] flex-col items-start gap-2">
              <p className="text-sm">
                {t("setting.notifications.newApplication")}
              </p>
              <p className="text-sm">
                {t("setting.notifications.applicantCommunication")}
              </p>
            </div>
            <div className="flex flex-[1] flex-col items-end gap-4">
              <NotificationSetting
                resource={userNotificationSettings}
                name="new_candidate"
              />
              <NotificationSetting
                resource={userNotificationSettings}
                name="communication_updates"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
            <div className="flex flex-[1] flex-col">
              <h3 className="font-medium">
                {t("setting.notifications.applicationStatus")}
              </h3>
            </div>
            <div className="flex flex-[2] flex-col items-start gap-2">
              <p className="text-sm">
                {t("setting.notifications.hiringStage")}
              </p>
              <p className="text-sm">
                {t("setting.notifications.applicationStatusUpdate")}
              </p>
            </div>
            <div className="flex flex-[1] flex-col items-end gap-4">
              <NotificationSetting
                resource={userNotificationSettings}
                name="hiring_stage"
              />
              <NotificationSetting
                resource={userNotificationSettings}
                name="resume_status"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
            <div className="flex flex-[1] flex-col">
              <h3 className="font-medium">
                {t("setting.notifications.eventReminders")}
              </h3>
            </div>
            <div className="flex flex-[2] flex-col items-start gap-2">
              <p className="text-sm">
                {t("setting.notifications.upcomingEvents")}
              </p>
              <p className="text-sm">
                {t("setting.notifications.recruitmentDeadlines")}
              </p>
            </div>
            <div className="flex flex-[1] flex-col items-end gap-4">
              <NotificationSetting
                resource={userNotificationSettings}
                name="events_update"
              />
              <NotificationSetting
                resource={userNotificationSettings}
                name="recruitment_dates"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
            <div className="flex flex-[1] flex-col">
              <h3 className="font-medium">
                {t("setting.notifications.accountActivity")}
              </h3>
            </div>
            <div className="mt-6 flex flex-[2] flex-col items-start gap-2">
              <p className="text-sm">
                {t("setting.notifications.accountSecurity")}
              </p>
              <p className="text-sm">
                {t("setting.notifications.subscriptionRenewals")}
              </p>
            </div>
            <div className="flex flex-[1] flex-col items-end gap-4">
              <NotificationSetting
                resource={userNotificationSettings}
                name="security_alerts"
              />
              <NotificationSetting
                resource={userNotificationSettings}
                name="renewal_dates"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationSettings;
