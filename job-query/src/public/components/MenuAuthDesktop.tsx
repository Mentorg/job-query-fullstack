import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../shared/context/AuthContext";

export default function MenuAuthDesktop() {
  const { user } = useAuth();
  const userRole = user?.role;
  const { t } = useTranslation();

  return (
    <>
      <NavLink
        to="/"
        style={({ isActive }) => {
          return isActive
            ? { borderBottom: "solid 2px #CE2079", color: "#CE2079" }
            : {};
        }}
        className="text-base font-medium transition-all hover:border-b-2 hover:border-solid hover:border-primary hover:text-primary"
      >
        {t("navigation.home")}
      </NavLink>
      {(userRole === "recruiter" || userRole === "admin") && (
        <>
          <NavLink
            to={userRole === "admin" ? "/admin/users" : "/dashboard/overview"}
            style={({ isActive }) => {
              return isActive
                ? { borderBottom: "solid 2px #CE2079", color: "#CE2079" }
                : {};
            }}
            className="text-base font-medium transition-all hover:border-b-2 hover:border-solid hover:border-primary hover:text-primary"
          >
            {t("navigation.dashboard")}
          </NavLink>
          {userRole === "recruiter" && (
            <NavLink
              to="/dashboard/newJob"
              className="rounded-md bg-primary px-7 py-1 text-base font-medium text-white transition-all hover:bg-primary/70"
            >
              {t("navigation.postJob")}
            </NavLink>
          )}
        </>
      )}
      <NavLink
        to="/privacyPolicy"
        style={({ isActive }) => {
          return isActive
            ? { borderBottom: "solid 2px #CE2079", color: "#CE2079" }
            : {};
        }}
        className="text-base font-medium transition-all hover:border-b-2 hover:border-solid hover:border-primary hover:text-primary"
      >
        {t("navigation.privacyPolicy")}
      </NavLink>
      <NavLink
        to="/contact"
        style={({ isActive }) => {
          return isActive
            ? { borderBottom: "solid 2px #CE2079", color: "#CE2079" }
            : {};
        }}
        className="text-base font-medium transition-all hover:border-b-2 hover:border-solid hover:border-primary hover:text-primary"
      >
        {t("navigation.contact")}
      </NavLink>
    </>
  );
}
