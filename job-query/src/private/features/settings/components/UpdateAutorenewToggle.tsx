import ToggleSwitch from "../../../components/ToggleSwitch";
import { useUpdateBillingSettings } from "../hooks/useUpdateBillingSettings";
import { Billing } from "../../../../shared/types/billing";

type UpdateAutorenewToggleProps = {
  resource: Billing;
};

function UpdateAutorenewToggle({ resource }: UpdateAutorenewToggleProps) {
  const { form, updateAutoRenew } = useUpdateBillingSettings(resource);

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    updateAutoRenew(checked);
  };

  return (
    <div>
      <ToggleSwitch
        isChecked={form.is_autorenew}
        onHandleChange={handleToggleChange}
        name="is_autorenew"
      />
    </div>
  );
}

export default UpdateAutorenewToggle;
