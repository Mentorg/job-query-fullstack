import { useTranslation } from "react-i18next";
import { LuPenLine } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import BillPaymentMethod from "../features/settings/components/BillPaymentMethod";
import Modal from "../context/Modal";
import Menus from "../context/Menus";
import UpdateBillingEmail from "../features/settings/components/UpdateBillingEmail";
import UpdateAutorenewToggle from "../features/settings/components/UpdateAutorenewToggle";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useBillingSettings } from "../features/settings/hooks/useBillingSettings";

function Billing() {
  const {
    billingSettings,
    isPending: isPendingBillingSettings,
    error: billingSettingsError,
  } = useBillingSettings();
  const { t } = useTranslation();

  return (
    <>
      {isPendingBillingSettings ? (
        <Loading />
      ) : billingSettingsError ? (
        <Fallback
          errorType="fetch"
          message={billingSettingsError.message || t("system.serverError")}
        />
      ) : (
        <div className="mt-10 w-full xl:w-[75%]">
          <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
            <div className="flex flex-[1] flex-col">
              <h3 className="font-medium">
                {t("setting.billInformation.contactEmail")}
              </h3>
              <p className="mt-2 text-sm lg:mt-6">
                {t("setting.billInformation.contactEmailDescription")}
              </p>
            </div>
            <div className="flex flex-[1] justify-center">
              <p>{billingSettings.email}</p>
            </div>
            <div className="flex flex-[1] justify-end">
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
                  <UpdateBillingEmail
                    resource={billingSettings}
                    onCloseModal={close}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
            <BillPaymentMethod />
          </div>
          <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
            <div className="flex flex-[1] flex-col">
              <h3 className="font-medium">
                {t("setting.billInformation.currentPlan")}
              </h3>
              <p className="mt-2 text-sm lg:mt-6">
                {t("setting.billInformation.updatePlan")}
              </p>
            </div>
            <div className="flex flex-[1] flex-col lg:items-center">
              <p className="font-medium">{t("system.comingSoon")}</p>
            </div>
            <div className="flex flex-[1] justify-end gap-4">
              <div className="flex items-center gap-4 rounded-md border-2 border-slate-300 px-6 py-2 text-left text-sm font-medium text-slate-500">
                {t("button.upgrade")}
                <span>
                  <LuPenLine />
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
            <div className="flex flex-[1] flex-col">
              <h3 className="font-medium">
                {t("setting.billInformation.autoRenew.autoRenew")}
              </h3>
              <p className="mt-2 text-sm lg:mt-6">
                {t("setting.billInformation.autoRenew.autoRenewDescription")}
              </p>
            </div>
            <div className="flex flex-[1] flex-col lg:items-center">
              <div className="flex flex-col lg:items-center">
                <p>
                  {t("setting.billInformation.autoRenew.autoRenewStatus")}{" "}
                  <span className="font-semibold">
                    {t(
                      billingSettings.is_autorenew
                        ? "setting.billInformation.autoRenew.activated"
                        : "setting.billInformation.autoRenew.deactivated",
                    )}
                  </span>
                </p>
                <NavLink
                  to="/dashboard/settings/notifications"
                  className="text-xs text-blue-500"
                >
                  {t(
                    "setting.billInformation.autoRenew.autoRenewNotifications",
                  )}
                </NavLink>
              </div>
            </div>
            <div className="flex flex-[1] justify-end gap-4">
              <UpdateAutorenewToggle resource={billingSettings} />
            </div>
          </div>
          <div className="mt-10 w-[90dvw] lg:w-[65dvw] xl:w-[70dvw]">
            {/* <InvoicesTable /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Billing;
