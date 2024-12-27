import Logo from "../../../../public/components/Logo";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { BillingContext } from "../../../context/BillingContext";
import { Invoice } from "../../../../shared/types/invoice";
import { Subscription } from "../../../../shared/types/subscription";

type InvoiceProps = {
  resource: Invoice;
  plan: Subscription | undefined;
};

function InvoiceReport({ resource, plan }: InvoiceProps) {
  const { userCompany } = useContext(BillingContext);

  return (
    <div className="flex h-[297mm] w-[210mm] flex-col justify-between border-2 border-gray-300 bg-white p-8">
      <div>
        <div className="py-4">
          <Logo mode="dark" />
        </div>
        <div className="mb-4 flex justify-between gap-x-[20rem]">
          <div>
            <h1 className="text-lg font-semibold">JobQuery</h1>
            <p className="text-sm">
              27 Oxford Street London, W1D 2DW United Kingdom
            </p>
            <p className="text-sm">Phone: 07430 123456</p>
            <p className="text-sm">Email: jobquery@contact.com</p>
          </div>
          <div>
            <p className="whitespace-nowrap text-2xl font-semibold">Invoice</p>
            <div>
              <h2 className="mt-4 whitespace-nowrap font-semibold">
                Invoice Number:{" "}
              </h2>
              <p className="text-sm font-medium text-slate-500">
                #{resource.reference}
              </p>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold">Status:</h2>
              <p
                className={`${resource.status ? "border-green-300 bg-green-100" : "border-red-300 bg-red-100"} w-max rounded-md border px-3 py-1 text-xs`}
              >
                {resource.status ? "Paid" : "Unpaid"}
              </p>
            </div>
          </div>
        </div>
        <div className="my-10 flex gap-x-20">
          <div>
            <h2 className="font-semibold">Bill To</h2>
            <p className="text-sm font-medium text-slate-500">
              {userCompany?.name}
            </p>
            <p className="text-sm font-medium text-slate-500">
              {userCompany?.address}
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Start Date</h2>
            <p className="text-sm font-medium text-slate-500">
              {resource.created_at}
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Due Date</h2>
            <p className="text-sm font-medium text-slate-500">
              {resource.due_date}
            </p>
          </div>
        </div>
        <div className="my-10">
          <div className="flex justify-between rounded-md bg-slate-200 p-1">
            <h2 className="text-sm font-semibold">Subscription Plan</h2>
            <h2 className="text-sm font-semibold">Frequency</h2>
            <h2 className="text-sm font-semibold">Amount</h2>
          </div>
          <div className="flex justify-between p-1">
            <p className="text-sm font-medium">{plan?.name}</p>
            <p className="text-sm font-medium">
              {plan?.is_annual ? "Annual" : "Monthly"}
            </p>
            <p className="text-sm font-medium">{plan?.price}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between border-b py-4">
          <div>
            <h2 className="font-semibold">Payment Instructions</h2>
            <div className="mt-2 flex flex-col">
              <h3 className="font-medium">Accepted payment methods: </h3>
              <p className="text-sm font-medium text-slate-500">Credit Card</p>
            </div>
            <div className="mt-2 flex flex-col">
              <h3 className="font-medium">Payment should be sent to: </h3>
              <p className="text-sm font-medium text-slate-500">
                27 Oxford Street London, W1D 2DW United Kingdom
              </p>
              <p className="text-sm font-medium text-slate-500">
                janedoe@innovize.com
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <NavLink to="/privacyPolicy" className="font-medium text-blue-600">
              Terms and Conditions
            </NavLink>
          </div>
        </div>
        <div className="flex justify-between py-4">
          <p className="font-semibold">Thank you for your business</p>
          <p className="font-semibold">
            Need help?{" "}
            <span className="text-sm text-slate-500">jobquery@contact.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InvoiceReport;
