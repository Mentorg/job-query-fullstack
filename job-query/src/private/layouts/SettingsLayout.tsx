import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SettingsLink from "../components/SettingsLink";

function SettingsLayout() {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:mt-4 xl:text-2xl">
          {t("pageTitle.settings")}
        </h1>
      </div>
      <div>
        <nav className="overflow-x-auto overflow-y-hidden rounded-md border border-slate-300 bg-slate-100 lg:w-[65dvw] xl:w-max">
          <ul className="flex py-2">
            <SettingsLink
              to="/dashboard/settings/account"
              title={t("setting.account.title")}
            />
            <SettingsLink
              to="/dashboard/settings/billing"
              title={t("setting.billInformation.title")}
            />
            <SettingsLink
              to="/dashboard/settings/locale"
              title={t("setting.locale.title")}
            />
            <SettingsLink
              to="/dashboard/settings/notifications"
              title={t("setting.notifications.title")}
            />
            <SettingsLink
              to="/dashboard/settings/support-terms"
              title={t("setting.supportTerms.title")}
            />
          </ul>
        </nav>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SettingsLayout;
