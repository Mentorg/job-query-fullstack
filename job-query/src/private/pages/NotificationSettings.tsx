import NotificationSetting from "../features/settings/components/NotificationSetting";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useGetNotificationSettings } from "../features/settings/hooks/useGetNotificationSettings";

function NotificationSettings() {
  const { userNotificationSettings, isPending, error } =
    useGetNotificationSettings();

  return (
    <>
      {isPending ? (
        <Loading />
      ) : error ? (
        <Fallback
          errorType="fetch"
          message={error.message || "Failed to load data"}
        />
      ) : (
        <div className="mt-10 w-full xl:w-[75%]">
          <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
            <div className="flex flex-[1] flex-col">
              <h3 className="font-medium">Job alerts</h3>
            </div>
            <div className="flex flex-[2] flex-col items-start gap-2">
              <p className="text-sm">
                Receive notifications when a new candidate applies to a job
                posting.
              </p>
              <p className="text-sm">
                Enable notifications for updates on communication with
                applicants
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
              <h3 className="font-medium">Application status updates</h3>
            </div>
            <div className="flex flex-[2] flex-col items-start gap-2">
              <p className="text-sm">Hiring stage notifications</p>
              <p className="text-sm">
                Candidate resume submission/application status change
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
              <h3 className="font-medium">Event reminders</h3>
            </div>
            <div className="flex flex-[2] flex-col items-start gap-2">
              <p className="text-sm">
                Upcoming job fairs, networking events, or industry conferences.
              </p>
              <p className="text-sm">
                Important dates related to recruitment processes.
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
              <h3 className="font-medium">Account activity</h3>
            </div>
            <div className="mt-6 flex flex-[2] flex-col items-start gap-2">
              <p className="text-sm">
                Account security such as login alerts or changes to account
                information.
              </p>
              <p className="text-sm">Upcoming subscription renewals.</p>
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
