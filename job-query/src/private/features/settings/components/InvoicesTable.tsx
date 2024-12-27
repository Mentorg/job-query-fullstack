import { PiArrowsDownUp } from "react-icons/pi";
import Table from "../../../context/Table";
import Menus from "../../../context/Menus";
import InvoiceRow from "./InvoiceRow";
import Button from "../../../../shared/components/ui/Button";
import { useInvoice } from "../hooks/useInvoice";
import { useSortableData } from "../../../hooks/useSortableData";
import { Invoice } from "../../../../shared/types/invoice";

function InvoicesTable() {
  const { companyInvoice, invoicesList, handleDeleteBill } = useInvoice();
  const { requestSort } = useSortableData(invoicesList);

  return (
    <Menus>
      <Table tableType="billing">
        <Table.Header>
          <Button
            onClick={() => requestSort("id")}
            className="flex items-center justify-between"
          >
            Id
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </Button>
          <Button
            onClick={() => requestSort("reference")}
            className="flex items-center justify-between"
          >
            Ref
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </Button>
          <Button
            onClick={() => requestSort("status")}
            className="flex items-center justify-between"
          >
            Status
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </Button>
          <Button
            onClick={() => requestSort("subscription_id")}
            className="flex items-center justify-between"
          >
            Plan
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </Button>
          <Button
            onClick={() => requestSort("annual")}
            className="flex items-center justify-between"
          >
            Frequency
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </Button>
          <Button
            onClick={() => requestSort("created_at")}
            className="flex items-center justify-between"
          >
            Billing Date
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </Button>
          <Button
            onClick={() => requestSort("due_date")}
            className="flex items-center justify-between"
          >
            Due Date
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </Button>
          <Button
            onClick={() => requestSort("amount")}
            className="flex items-center justify-between"
          >
            Amount
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </Button>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        </Table.Header>
        <Table.Body
          data={companyInvoice}
          render={(invoice: Invoice) => (
            <InvoiceRow
              key={invoice.id}
              resource={invoice}
              onDelete={() => handleDeleteBill(invoice.id)}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default InvoicesTable;
