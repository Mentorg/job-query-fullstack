import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import Select from "../../shared/components/form/Select";
import Option from "../../shared/components/form/Option";
import { useAuth } from "../../shared/context/AuthContext";
import { useUpdateLocaleSettings } from "../../private/features/settings/hooks/useUpdateLocaleSettings";
import { useTranslation } from "react-i18next";

function Footer() {
  const { user } = useAuth();
  const { form, errors, handleLanguageChange, isSubmitted } =
    useUpdateLocaleSettings(user);
  const { t } = useTranslation();

  const languageMap: Record<string, string> = {
    "en-US": "English",
    de: "Deutsch",
    fr: "Français",
  };

  return (
    <footer className="bg-primary px-2 py-10">
      <div className="container mx-auto flex flex-col place-items-center gap-y-10 lg:gap-y-20">
        <Logo mode="light" />
        <div className="flex flex-col justify-items-center gap-x-20 gap-y-5 sm:flex-row lg:space-y-0">
          <NavLink
            to="/privacyPolicy"
            className="whitespace-nowrap font-medium text-white"
          >
            {t("navigation.privacyPolicy")}
          </NavLink>
          <NavLink
            to="/contact"
            className="whitespace-nowrap font-medium text-white"
          >
            {t("navigation.contact")}
          </NavLink>
        </div>
        <div className="grid w-fit grid-cols-1 flex-row items-end justify-center space-y-6 md:w-full md:grid-cols-3 md:justify-between md:space-y-0">
          <div className="flex w-max flex-col gap-y-2">
            <Select
              name="language"
              value={form.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              errors={errors}
              hasError={isSubmitted && !!errors.language}
            >
              {["en-US", "de", "fr"].map((languageCode) => (
                <Option value={languageCode} key={languageCode}>
                  {languageMap[languageCode]}
                </Option>
              ))}
            </Select>
          </div>
          <h2 className="text-center font-medium text-white ">
            jobQuery@contact.com
          </h2>
          <p className="text-center font-medium text-white ">
            2024 JobQuery. {t("system.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
