import { useTranslation } from "react-i18next";
import { LuPenLine } from "react-icons/lu";
import Modal from "../context/Modal";
import Menus from "../context/Menus";
import UpdateLanguage from "../components/UpdateLanguage";
import UpdateTimezone from "../features/settings/components/UpdateTimezone";
import UpdateCurrency from "../features/settings/components/UpdateCurrency";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useAuth } from "../../shared/context/AuthContext";
import { useGetRecruiter } from "../features/profiles/hooks/useGetRecruiter";

function Locale() {
  const { user } = useAuth();
  const { recruiter, isPending, error } = useGetRecruiter();
  const { t } = useTranslation();

  const languageMap: Record<string, string> = {
    "en-US": "English",
    de: "German",
    fr: "French",
  };

  const languageName =
    user?.language && languageMap[user.language]
      ? languageMap[user.language]
      : user?.language;
  console.log(recruiter);
  return (
    <div className="mt-10 w-full xl:w-[75%]">
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">{t("setting.locale.language")}</h3>
          <p className="mt-2 text-sm lg:mt-6">
            {t("setting.locale.languageDescription")}
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          <p>{languageName}</p>
        </div>
        <div className="flex flex-[1] justify-end gap-4">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                {t("button.edit")}
                <span>
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdateLanguage resource={user} onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">{t("setting.locale.timezone")}</h3>
          <p className="mt-2 text-sm lg:mt-6">
            {t("setting.locale.timezoneDescription")}
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          <p>{user?.timezone}</p>
        </div>
        <div className="flex flex-[1] justify-end gap-4">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                {t("button.edit")}
                <span>
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdateTimezone resource={user} onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">{t("setting.locale.baseCurrency")}</h3>
          <p className="mt-2 text-sm lg:mt-6">
            {t("setting.locale.baseCurrencyDescription")}
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          {isPending ? (
            <Loading />
          ) : error ? (
            <Fallback
              errorType="fetch"
              message={error.message || t("system.serverError")}
            />
          ) : (
            <p>
              {recruiter.currency.name} - {recruiter.currency.symbol}
            </p>
          )}
        </div>
        <div className="flex flex-[1] justify-end gap-4">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                {t("button.edit")}
                <span>
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdateCurrency resource={recruiter} onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Locale;
