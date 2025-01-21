import { useTranslation } from "react-i18next";
import { IoPencilSharp } from "react-icons/io5";
import { HiTrash } from "react-icons/hi2";
import Modal from "../../../context/Modal";
import Menus from "../../../context/Menus";
import UpdatePaymentMethod from "./UpdatePaymentMethod";
import ConfirmDelete from "../../../components/ConfirmDelete";
import mastercard from "../../../../../public/logos/mastercard.svg";
import visa from "../../../../../public/logos/visa.svg";
import {
  PaymentMethod,
  UpdatePaymentMethodForm,
} from "../../../../shared/types/payment_method";
import { useSetDefaultPaymentMethod } from "../hooks/useSetDefaultPaymentMethod";
import { useDeletePaymentMethod } from "../hooks/useDeletePaymentMethod";

type CreditCardExpandedProps = {
  resource: PaymentMethod;
};

function CreditCardExpanded({ resource }: CreditCardExpandedProps) {
  const { updateStatus } = useSetDefaultPaymentMethod(resource);
  const { handleDelete } = useDeletePaymentMethod(resource);
  const { t } = useTranslation();

  return (
    <div
      key={resource.id}
      onClick={updateStatus}
      className={`${resource.isActive ? "border-blue-400" : ""} flex w-auto min-w-max cursor-pointer justify-between gap-x-2 rounded-md border bg-slate-50 px-4 py-4`}
    >
      <div className="flex flex-col gap-1 xs:flex-row">
        <div className="flex items-center justify-center rounded-md border border-slate-200">
          <img
            src={resource.cardType === "MasterCard" ? mastercard : visa}
            alt={`${resource.cardType}'s logo`}
            className="w-[50%]"
          />
        </div>
        <div className="ml-4 flex flex-col gap-y-4">
          <h4 className="text-sm font-medium">{resource.cardType}</h4>
          <p className="text-xs">
            {t("setting.billInformation.expirationDate")}:{" "}
            <span className="font-semibold">{resource.expirationDate}</span>
          </p>
          <p>{resource.cardNumber}</p>
          <p className="text-xs font-semibold">
            {t("setting.billInformation.cvv")}:{" "}
            <span className="font-normal">{resource.cvv}</span>
          </p>
          <p className="text-xs text-blue-400">
            {resource.isActive ? t("setting.billInformation.setDefault") : ""}
          </p>
        </div>
        <div className="text-xs"></div>
      </div>
      <div className="flex">
        <Modal>
          <Modal.Open opens="edit">
            <Menus.Button type="icon">
              <IoPencilSharp className="h-fit w-full rounded-full p-2 transition-all hover:bg-gray-200" />
            </Menus.Button>
          </Modal.Open>
          <Modal.Window name="edit">
            <UpdatePaymentMethod
              resource={resource as UpdatePaymentMethodForm}
              onCloseModal={close}
            />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="edit">
            <Menus.Button type="icon">
              <HiTrash className="h-fit w-full rounded-full p-2 transition-all hover:bg-gray-200" />
            </Menus.Button>
          </Modal.Open>
          <Modal.Window name="edit">
            <ConfirmDelete
              resourceName={resource.cardType}
              onConfirm={handleDelete}
              onCloseModal={close}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default CreditCardExpanded;
