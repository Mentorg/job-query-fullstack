import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateRecruiterNotificationSettings } from "../../../../shared/services/apiUser";
import { NotificationSettings } from "../../../../shared/types/notification_settings";

export function useUpdateNotificationSettings(
  notificationSetting: NotificationSettings,
) {
  const [form, setForm] = useState<NotificationSettings>(notificationSetting);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: NotificationSettings) =>
      updateRecruiterNotificationSettings(form),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(
        "Your notification settings have been updated successfully.",
      );
    },
    onError: (error) => {
      toast.error(
        "Failed to update your notification settings! Error: " + error.message,
      );
    },
  });

  const handleChange = async (
    name: keyof NotificationSettings,
    value: boolean,
  ) => {
    try {
      await updateRecruiterNotificationSettings({ [name]: value });
      setForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } catch (error) {
      console.error("Error updating notification setting: ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(form);
      console.log("Submission successful.");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message ||
            "Updating notification settings failed!",
        );
      }
      throw new Error("An unexpected error occurred!");
    }
  };

  return { form, handleChange, handleSubmit };
}
