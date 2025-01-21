import { useTranslation } from "react-i18next";
import { HiMiniPlus } from "react-icons/hi2";
import Modal from "../../../context/Modal";
import Menus from "../../../context/Menus";
import CreatePaymentMethod from "./CreatePaymentMethod";
import CreditCardExpanded from "./CreditCardExpanded";
import CreditCardCompact from "./CreditCardCompact";
import Loading from "../../../../shared/components/ui/Loading";
import Fallback from "../../../../shared/components/ui/Fallback";
import { useGetCompanyPaymentMethods } from "../hooks/useGetCompanyPaymentMethods";
import { PaymentMethod } from "../../../../shared/types/payment_method";

function BillPaymentMethod() {
  const { paymentMethods, isPending, error } = useGetCompanyPaymentMethods();
  const { t } = useTranslation();

  return (
    <>
      {isPending ? (
        <Loading />
      ) : error ? (
        <Fallback
          errorType="fetch"
          message={error.message || t("system.serverError")}
        />
      ) : (
        <>
          <div className="flex flex-[1] flex-col">
            <h3 className="font-medium">
              {t("setting.billInformation.paymentMethod")}
            </h3>
            <p className="mt-2 text-sm lg:mt-6">
              {t("setting.billInformation.paymentMethodDescription")}
            </p>
          </div>
          <div
            className={
              paymentMethods.length <= 2
                ? "flex flex-[1] flex-col gap-y-2"
                : "grid grid-cols-2 gap-2"
            }
          >
            {paymentMethods.length > 0 ? (
              paymentMethods.length > 2 ? (
                paymentMethods.map((method: PaymentMethod) => (
                  <CreditCardCompact key={method.id} resource={method} />
                ))
              ) : (
                paymentMethods.map((method: PaymentMethod) => (
                  <CreditCardExpanded key={method.id} resource={method} />
                ))
              )
            ) : (
              <div>
                <h2 className="flex justify-center">
                  {t("setting.billInformation.noPaymentMethod")}
                </h2>
              </div>
            )}
          </div>
          <div className="flex flex-[1] justify-end gap-4">
            <Modal>
              <Modal.Open opens="add">
                <Menus.Button type="add">
                  {t("button.addCard")}
                  <span className="ml-2">
                    <HiMiniPlus />
                  </span>
                </Menus.Button>
              </Modal.Open>
              <Modal.Window name="add">
                <CreatePaymentMethod onCloseModal={close} />
              </Modal.Window>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}

export default BillPaymentMethod;
