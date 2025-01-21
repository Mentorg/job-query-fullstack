import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaPhone,
  FaSignInAlt,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";
import MenuLink from "../../shared/components/ui/MenuLink";

function MenuUnauthMobile() {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <h2>
          <span dangerouslySetInnerHTML={{ __html: t("navigation.welcome") }} />
        </h2>
      </div>
      <hr />
      <MenuLink to="/login">
        <FaSignInAlt className="h-5 w-5" />
        <span className="ml-2">{t("navigation.login")}</span>
      </MenuLink>
      <MenuLink to="/signup">
        <FaUserPlus className="h-5 w-5" />
        <span className="ml-2">{t("navigation.signUp")}</span>
      </MenuLink>
      <hr />
      <MenuLink to="/">
        <FaHome className="h-5 w-5" />
        <span className="ml-2">{t("navigation.home")}</span>
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
  );
}

export default MenuUnauthMobile;
