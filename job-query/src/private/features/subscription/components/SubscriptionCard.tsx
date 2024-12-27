// import Menus from "../../../context/Menus";
// import Modal from "../../../context/Modal";
// import ConfirmPlan from "./ConfirmPlan";
// import { useUpdateSubscription } from "../hooks/useUpdateSubscription";

function SubscriptionCard() {
  /* const isActivePlan = companyPlan.some(
    (company) =>
      company.subscription_id === plan.id && company.status === "active",
  );
  const companyId = companyPlan.map((record) => record.id);

  const { handleUpdatePlan } = useUpdateSubscription(Number(companyId)); */

  return (
    // <div
    //   className={`${
    //     isActivePlan ? "border-primary" : "border-slate-100"
    //   } flex w-full flex-col items-center rounded-md border-2 bg-slate-100 px-6 py-6 xl:px-12 2xl:min-w-[75%] 2xl:max-w-[75%]`}
    // >
    //   <h2 className="text-xl font-medium">{plan.description}</h2>
    //   {isActivePlan && <p className="text-primary">Active plan</p>}
    //   <p className="m-12 text-4xl font-medium xl:text-5xl">
    //     {plan.price}/
    //     {plan.is_annual ? (
    //       <span className="text-sm">Year</span>
    //     ) : (
    //       <span className="text-sm">Month</span>
    //     )}
    //   </p>
    //   <ul>
    //     {plan.feature?.map((feature) => (
    //       <li key={feature.id} className="text-sm leading-8 xl:leading-10">
    //         {feature.description}
    //       </li>
    //     ))}
    //   </ul>
    //   <Modal>
    //     <Modal.Open opens="delete">
    //       <Menus.Button type="confirm">
    //         <span>Chose Plan</span>
    //       </Menus.Button>
    //     </Modal.Open>
    //     <Modal.Window name="delete">
    //       <ConfirmPlan
    //         plan={plan}
    //         onConfirm={handleUpdatePlan}
    //         onCloseModal={close}
    //       />
    //     </Modal.Window>
    //   </Modal>
    // </div>
    <h2>Coming soon</h2>
  );
}

export default SubscriptionCard;
