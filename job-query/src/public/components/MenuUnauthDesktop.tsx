import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function MenuUnauthDesktop() {
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
        replace
        className="text-base font-medium transition-all hover:border-b-2 hover:border-solid hover:border-primary hover:text-primary"
      >
        {t("navigation.home")}
      </NavLink>
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
