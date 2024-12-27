// import { useContext, useState } from "react";
// import { BillingContext } from "../../../context/BillingContext";
// import { invoices } from "../data/invoices";
// import { subscription } from "../../subscription/data/subscription";
// import { Subscription } from "../../../../shared/types/subscription";
// import { Invoice } from "../../../../shared/types/invoice";

// type UseInvoiceData = {
//   companyInvoice: Invoice[];
//   invoicesList: Invoice[];
//   plan: Subscription;
//   handleDeleteBill: (id: number) => void;
// };

// const defaultPlan: Subscription = {
//   id: 1, // or any default id
//   name: "Default Plan",
//   is_annual: false,
//   price: "$0",
//   is_active: false,
//   features: [],
// };

// function useInvoice(resource?: Invoice): UseInvoiceData {
//   const [invoicesList, setInvoicesList] = useState(invoices);
//   const { userCompany } = useContext(BillingContext);

//   const companyInvoice = invoicesList.filter(
//     (invoice) => invoice.company_id === userCompany?.id,
//   );

//   const plan =
//     subscription.find((record) => record.id === resource?.subscription_id) ||
//     defaultPlan;

//   function handleDeleteBill(id: number) {
//     setInvoicesList((prevData) => {
//       const updatedBillingList = prevData.filter((record) => record.id !== id);
//       return updatedBillingList;
//     });
//   }

//   return {
//     companyInvoice,
//     invoicesList,
//     plan,
//     handleDeleteBill,
//   };
// }

// export { useInvoice };
