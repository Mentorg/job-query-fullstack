import { Outlet } from "react-router-dom";
import SettingsLink from "../components/SettingsLink";

function SettingsLayout() {
  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:mt-4 xl:text-3xl">Settings</h1>
      </div>
      <div>
        <nav className="overflow-x-auto overflow-y-hidden rounded-md border border-slate-300 bg-slate-100 lg:w-[65dvw] xl:w-max">
          <ul className="flex py-2">
            <SettingsLink
              to="/dashboard/settings/account"
              title="Account Settings"
            />
            <SettingsLink
              to="/dashboard/settings/billing"
              title="Bill Information"
            />
            <SettingsLink to="/dashboard/settings/locale" title="Locale" />
            <SettingsLink
              to="/dashboard/settings/notifications"
              title="Notifications"
            />
            <SettingsLink
              to="/dashboard/settings/support-terms"
              title="Support & Terms"
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
