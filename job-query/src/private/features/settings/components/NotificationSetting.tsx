import ToggleSwitch from "../../../components/ToggleSwitch";
import { useUpdateNotificationSettings } from "../hooks/useUpdateNotificationSettings";
import { NotificationSettings } from "../../../../shared/types/notification_settings";

type NotificationSettingProps = {
  resource: NotificationSettings;
  name: keyof NotificationSettings;
};

function NotificationSetting({ resource, name }: NotificationSettingProps) {
  const { form, handleChange } = useUpdateNotificationSettings(resource);

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    handleChange(name, checked);
  };

  return (
    <div>
      <ToggleSwitch
        isChecked={!!form[name]}
        onHandleChange={handleToggleChange}
        name={name}
      />
    </div>
  );
}

export default NotificationSetting;
