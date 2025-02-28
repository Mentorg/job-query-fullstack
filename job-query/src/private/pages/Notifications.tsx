import { t } from "i18next";
import Fallback from "../../shared/components/ui/Fallback";
import Loading from "../../shared/components/ui/Loading";
import { useGetUserNotifications } from "../hooks/useGetUserNotifications";
import { formatDate } from "../../shared/utils/dateFormat";
import { Notification } from "../../shared/types/notification";

function Notifications() {
  const { userNotifications, isPending, error } = useGetUserNotifications();

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-3xl">
          Notifications
        </h1>
      </div>
      <div className="flex flex-col">
        {isPending ? (
          <Loading />
        ) : error ? (
          <Fallback
            errorType="fetch"
            message={error.message || t("system.serverError")}
          />
        ) : userNotifications.length > 0 ? (
          userNotifications.map((notification: Notification) => (
            <div
              key={notification.id}
              className={`${!notification.readAt ? "bg-slate-100" : ""} flex border-b border-slate-300 px-6 py-4 transition-all`}
            >
              <img
                src="https://placehold.co/100/fff/9e9e9e?text=i"
                alt="Notification icon"
                className="h-10 w-10 rounded-full border-2 border-slate-300"
              />
              <div className="ml-2 w-full">
                <h3 className="text-xs font-medium text-slate-500">
                  {notification.type}
                </h3>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-base">
                    Status:{" "}
                    <span className="font-medium">
                      {notification.status === "shortlisted"
                        ? "Shortlisted"
                        : notification.status === "on-hold"
                          ? "On hold"
                          : notification.status === "interview"
                            ? "Interview"
                            : "Rejected"}
                    </span>
                  </h2>
                  <p className="ml-auto whitespace-nowrap text-xs font-medium text-slate-500 md:ml-4">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
                <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                  {notification.message}
                </p>
              </div>
            </div>
          ))
        ) : (
          <>
            <h2>No notifications yet</h2>
          </>
        )}
      </div>
    </div>
  );
}

export default Notifications;
