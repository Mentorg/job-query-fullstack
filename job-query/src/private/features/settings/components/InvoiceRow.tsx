import { HiEye, HiTrash } from "react-icons/hi2";
import Table from "../../../context/Table";
import Modal from "../../../context/Modal";
import Menus from "../../../context/Menus";
import ConfirmDelete from "../../../components/ConfirmDelete";
import InvoiceReport from "./InvoiceReport";
// import { useInvoice } from "../hooks/useInvoice";
import { Invoice } from "../../../../shared/types/invoice";

type InvoiceRowProps = {
  resource: Invoice;
  onDelete: () => void;
};

function InvoiceRow({ resource, onDelete }: InvoiceRowProps) {
  // const { plan } = useInvoice(resource);

  return (
    <Table.Row>
      <div>
        <p className="text-sm font-semibold text-slate-600">{resource.id}</p>
      </div>
      <div>
        <p className="text-sm">Invoice #{resource.reference}</p>
      </div>
      <div>
        <p
          className={`${resource.status ? "border-green-300 bg-green-100" : "border-red-300 bg-red-100"} w-max rounded-md border px-3 py-1 text-xs`}
        >
          {resource.status ? "Paid" : "Unpaid"}
        </p>
      </div>
      <div>
        <p className="text-sm">{plan?.name}</p>
      </div>
      <div>
        <p className="text-sm">{plan?.is_annual ? "Year" : "Month"}</p>
      </div>
      <div>
        <p className="text-sm">{resource.created_at}</p>
      </div>
      <div>
        <p className="text-sm">{resource.due_date}</p>
      </div>
      <div>
        <p className="text-sm">{plan?.price}</p>
      </div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={resource.id.toString()} />
            <Menus.List id={resource.id.toString()}>
              <Modal.Open opens="view">
                <Menus.Button type="option">
                  <HiEye />
                  <span>View Details</span>
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button type="option">
                  <HiTrash />
                  <span>Delete</span>
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="view">
              {/* <InvoiceReport resource={resource} plan={plan} /> */}
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={resource.reference}
                onConfirm={onDelete}
                onCloseModal={close}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default InvoiceRow;
