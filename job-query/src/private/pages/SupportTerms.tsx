import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoDocumentTextOutline } from "react-icons/io5";
import { feedback } from "../features/settings/data/feedback";

function SupportTerms() {
  const { t } = useTranslation();

  return (
    <div className="mt-10 w-full xl:w-[75%]">
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">
            {t("setting.supportTerms.privacyPolicy")}
          </h3>
          <p className="mt-2 text-sm lg:mt-6">
            {t("setting.supportTerms.privacyPolicyDescription")}
          </p>
        </div>
        <div className="flex flex-[1] justify-end gap-4">
          <NavLink
            to="/privacyPolicy"
            className="flex items-center rounded-md border-2 border-primary px-3 py-1 text-sm text-primary transition-all hover:border-primary hover:bg-primary hover:text-white"
          >
            {t("button.view")}
            <span className="ml-2">
              <IoDocumentTextOutline />
            </span>
          </NavLink>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">
            {t("setting.supportTerms.contactSupport")}
          </h3>
          <p className="mt-2 text-sm lg:mt-6">
            {t("setting.supportTerms.contactSupportDescription")}
          </p>
        </div>
        <div className="flex flex-[1] justify-end">
          <ul>
            <li className="text-sm leading-6">
              <span className="font-medium">
                {t("setting.supportTerms.email")}:
              </span>{" "}
              info@jobqueryapp.com
            </li>
            <li className="text-sm leading-6">
              <span className="font-medium">
                {t("setting.supportTerms.phone")}:
              </span>{" "}
              (123) 456-7890
            </li>
            <li className="text-sm leading-6">
              <span className="font-medium">
                {t("setting.supportTerms.address")}:
              </span>{" "}
              123 Main Street, Berlin, DE
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-center py-10">
          <h2 className="text-2xl font-medium">FAQs</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
          {feedback.map((feedbackData) => (
            <div
              key={feedbackData.question}
              className="rounded-md bg-slate-100 p-10"
            >
              <h4 className="font-semibold">{feedbackData.question}</h4>
              <p className="mt-4 text-sm">{feedbackData.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SupportTerms;
