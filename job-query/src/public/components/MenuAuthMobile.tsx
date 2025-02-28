import { useTranslation } from "react-i18next";
import {
  FaBuilding,
  FaCity,
  FaCog,
  FaHome,
  FaNewspaper,
  FaPhone,
  FaPlus,
  FaRegBuilding,
  FaRegChartBar,
  FaSignOutAlt,
  FaUser,
  FaUserLock,
  FaUserShield,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import { HiMiniBell, HiMiniEnvelope, HiMiniTag } from "react-icons/hi2";
import MenuLink from "../../shared/components/ui/MenuLink";
import Button from "../../shared/components/ui/Button";
import { useAuth } from "../../shared/context/AuthContext";
import { useLogout } from "../hooks/useLogout";

function MenuAuthMobile() {
  const { user } = useAuth();
  const logout = useLogout();
  const { t } = useTranslation();

  let avatar;

  if (user?.avatar) {
    if (user?.role === "admin") {
      avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/admin.png`;
    } else if (user?.avatar.includes("avatars")) {
      avatar = `http://127.0.0.1:8000/storage/${user?.avatar}`;
    } else {
      avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${user?.avatar}`;
    }
  } else {
    avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-avatar.png`;
  }

  return (
    <>
      <div className="flex">
        <img
          src={avatar}
          alt="User's avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-2 flex flex-col justify-center">
          <h2 className="text-sm font-semibold">
            {t("navigation.hey")}, {user?.name}!
          </h2>
          <p className="text-xs text-slate-600">{user?.email}</p>
        </div>
      </div>
      {user?.role === "recruiter" ? (
        <>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniEnvelope className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">
                {t("navigation.messages")}
              </p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                {t("system.soon")}
              </span>
            </div>
          </div>
          <MenuLink to="/dashboard/notifications">
            <HiMiniBell className="h-5 w-5" />
            <span className="ml-2">{t("navigation.notifications")}</span>
          </MenuLink>
          <hr />
          <MenuLink to="/">
            <FaHome className="h-5 w-5" />
            <span className="ml-2">{t("navigation.home")}</span>
          </MenuLink>
          <MenuLink to="/dashboard/overview">
            <FaUserLock className="h-5 w-5" />
            <span className="ml-2">{t("navigation.overview")}</span>
          </MenuLink>
          <MenuLink to="/dashboard/analytics">
            <FaRegChartBar className="h-5 w-5" />
            <span className="ml-2">{t("navigation.analytics")}</span>
          </MenuLink>
          <MenuLink to="/dashboard/company">
            <FaRegBuilding className="h-5 w-5" />
            <span className="ml-2">{t("navigation.companyProfile")}</span>
          </MenuLink>
          <MenuLink to="/dashboard/user">
            <FaUser className="h-5 w-5" />
            <span className="ml-2">{t("navigation.userProfile")}</span>
          </MenuLink>
          <MenuLink to="/dashboard/applications">
            <FaUsers className="h-5 w-5" />
            <span className="ml-2">{t("navigation.applications")}</span>
          </MenuLink>
          <MenuLink to="/dashboard/jobs">
            <FaNewspaper className="h-5 w-5" />
            <span className="ml-2">{t("navigation.jobs")}</span>
          </MenuLink>
          <MenuLink to="/dashboard/newJob">
            <FaPlus className="h-5 w-5" />
            <span className="ml-2">{t("navigation.postJob")}</span>
          </MenuLink>
          <hr />
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniTag className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">
                {t("navigation.pricingPlans")}
              </p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                {t("system.soon")}
              </span>
            </div>
          </div>
          <MenuLink to="/dashboard/settings/account">
            <FaCog className="h-5 w-5" />
            <span className="ml-2">{t("navigation.settings")}</span>
          </MenuLink>
        </>
      ) : user?.role === "admin" ? (
        <>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniEnvelope className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">
                {t("navigation.messages")}
              </p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                {t("system.soon")}
              </span>
            </div>
          </div>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniBell className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">
                {t("navigation.notifications")}
              </p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                {t("system.soon")}
              </span>
            </div>
          </div>
          <hr />
          <MenuLink to="/">
            <FaHome className="h-5 w-5" />
            <span className="ml-2">{t("navigation.home")}</span>
          </MenuLink>
          <MenuLink to="/admin/users">
            <FaUsers className="h-5 w-5" />
            <span className="ml-2">{t("navigation.users")}</span>
          </MenuLink>
          <MenuLink to="/admin/companies">
            <FaCity className="h-5 w-5" />
            <span className="ml-2">{t("navigation.companies")}</span>
          </MenuLink>
          <MenuLink to="/admin/jobs">
            <FaNewspaper className="h-5 w-5" />
            <span className="ml-2">{t("navigation.jobs")}</span>
          </MenuLink>
          <hr />
          <MenuLink to="/admin/newRecruiter">
            <FaUserTie className="h-5 w-5" />
            <span className="ml-2">{t("navigation.createRecruiter")}</span>
          </MenuLink>
          <MenuLink to="/admin/newCompany">
            <FaBuilding className="h-5 w-5" />
            <span className="ml-2">{t("navigation.createCompany")}</span>
          </MenuLink>
        </>
      ) : (
        <>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniEnvelope className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">
                {t("navigation.messages")}
              </p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                {t("system.soon")}
              </span>
            </div>
          </div>
          <MenuLink to="/user/notifications">
            <HiMiniBell className="h-5 w-5" />
            <span className="ml-2">{t("navigation.notifications")}</span>
          </MenuLink>
          <hr />
          <MenuLink to="/">
            <FaHome className="h-5 w-5" />
            <span className="ml-2">{t("navigation.home")}</span>
          </MenuLink>
          <MenuLink to="/user/profile">
            <FaUser className="h-5 w-5" />
            <span className="ml-2">{t("navigation.userProfile")}</span>
          </MenuLink>
          <MenuLink to="/privacyPolicy">
            <FaUserShield className="h-5 w-5" />
            <span className="ml-2">{t("navigation.privacyPolicy")}</span>
          </MenuLink>
          <MenuLink to="/contact">
            <FaPhone className="h-5 w-5" />
            <span className="ml-2">{t("navigation.contact")}</span>
          </MenuLink>
        </>
      )}
      <hr />
      <Button
        onClick={logout}
        className="group flex items-center rounded-md px-2 py-1 text-sm text-slate-500 transition-all hover:bg-primary"
      >
        <FaSignOutAlt className="h-5 w-5" />
        <span className="ml-2">{t("navigation.signOut")}</span>
      </Button>
    </>
  );
}

export default MenuAuthMobile;
