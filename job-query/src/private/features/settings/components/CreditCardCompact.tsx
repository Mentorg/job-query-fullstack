import { IoPencilSharp } from "react-icons/io5";
import { HiTrash } from "react-icons/hi2";
import mastercard from "../../../../../public/logos/mastercard.svg";
import visa from "../../../../../public/logos/visa.svg";
import Menus from "../../../context/Menus";
import Modal from "../../../context/Modal";
import UpdatePaymentMethod from "./UpdatePaymentMethod";
import ConfirmDelete from "../../../components/ConfirmDelete";
import { useSetDefaultPaymentMethod } from "../hooks/useSetDefaultPaymentMethod";
import { useDeletePaymentMethod } from "../hooks/useDeletePaymentMethod";
import {
  PaymentMethod,
  UpdatePaymentMethodForm,
} from "../../../../shared/types/payment_method";

type CreditCardCompactProps = {
  resource: PaymentMethod;
};

function CreditCardCompact({ resource }: CreditCardCompactProps) {
  const { updateStatus } = useSetDefaultPaymentMethod(resource);
  const { handleDelete } = useDeletePaymentMethod(resource);

  return (
    <div
      key={resource.id}
      onClick={updateStatus}
      className={`${resource.isActive ? "border-blue-400" : ""} flex w-auto cursor-pointer justify-between gap-x-2 rounded-md border bg-slate-50 px-4 py-4`}
    >
      <div className="flex flex-col gap-1 xs:flex-row">
        <div className="flex items-center justify-center rounded-md border border-slate-200">
          <img
            src={resource.cardType === "MasterCard" ? mastercard : visa}
            alt={`${resource.cardType}'s logo`}
            className="w-[40%]"
          />
        </div>
        <div className="ml-4 flex flex-col gap-y-1">
          <h4 className="text-sm font-medium">{resource.cardType}</h4>
          <p className="text-xs font-semibold">
            CVV: <span className="font-normal">{resource.cvv}</span>
          </p>
          <p className="text-xs text-blue-400">
            {resource.isActive ? "Default" : ""}
          </p>
        </div>
        <div className="text-xs"></div>
      </div>
      <div className="flex flex-col">
        <Modal>
          <Modal.Open opens="delete">
            <Menus.Button type="icon">
              <HiTrash className="h-fit w-full rounded-full p-2 transition-all hover:bg-gray-200" />
            </Menus.Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={resource.cardType}
              onConfirm={handleDelete}
              onCloseModal={close}
            />
          </Modal.Window>
        </Modal>
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
      </div>
    </div>
  );
}

export default CreditCardCompact;
