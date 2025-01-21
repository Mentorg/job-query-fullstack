import { useTranslation } from "react-i18next";
import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import { useUpdatePassword } from "../features/settings/hooks/useUpdatePassword";

type UpdatePasswordProps = {
  onCloseModal: () => void;
};

function UpdatePassword({ onCloseModal }: UpdatePasswordProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdatePassword();
  const { t } = useTranslation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col md:flex-row md:gap-x-10">
      <div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="current_password">{t("label.currentPassword")}</Label>
          <TextField
            name="current_password"
            type="password"
            value={form.current_password}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.current_password}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="new_password">{t("label.newPassword")}</Label>
          <TextField
            name="new_password"
            type="password"
            value={form.new_password}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.new_password}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="new_password_confirmation">
            {t("label.confirmNewPassword")}
          </Label>
          <TextField
            name="new_password_confirmation"
            type="password"
            value={form.new_password_confirmation}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.new_password_confirmation}
          />
        </div>
        <Button className="mt-4 rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/70">
          {t("button.submit")}
        </Button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium">
          {t("setting.account.instruction.title")}
        </h2>
        <ul className="mt-2">
          <li className="list-inside list-disc text-sm">
            {t("setting.account.instruction.upperCase")}
          </li>
          <li className="list-inside list-disc text-sm">
            {t("setting.account.instruction.lowerCase")}
          </li>
          <li className="list-inside list-disc text-sm">
            {t("setting.account.instruction.oneDigit")}
          </li>
          <li className="list-inside list-disc text-sm">
            {t("setting.account.instruction.minLength")}
          </li>
        </ul>
      </div>
    </form>
  );
}

export default UpdatePassword;
