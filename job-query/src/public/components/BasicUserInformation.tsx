import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import Label from "../../shared/components/form/Label";
import { SignupErrors, SignupProps } from "../../shared/types/user";

function BasicUserInformation({
  form,
  errors,
  handleChange,
  handleSubmit,
  isSubmitted,
}: {
  form: SignupProps;
  errors: SignupErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitted: boolean;
}) {
  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex w-[90dvw] flex-col rounded-md bg-white p-10 md:m-0 md:w-max"
    >
      <div className="py-4 lg:py-10">
        <h1 className="text-xl font-medium lg:text-3xl">{t("auth.title")}</h1>
        <p className="mt-2 text-lg font-medium text-slate-700 lg:text-2xl">
          {t("auth.headlineSignup")}
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="name">{t("label.name")}</Label>
        <TextField
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.name}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="email">{t("label.email")}</Label>
        <TextField
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.email}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="password">{t("label.password")}</Label>
        <p className="text-xs text-slate-500">
          ({t("system.passwordInstruction")})
        </p>
        <TextField
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.password}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="password_confirmation">
          {t("label.confirmPassword")}
        </Label>
        <TextField
          name="password_confirmation"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.password_confirmation}
        />
      </div>
      <Button className="mt-4 rounded-md bg-primary px-4 py-2 text-white">
        {t("button.continue")}
      </Button>
      <p className="mt-4">
        {t("auth.existingAccount")}{" "}
        <NavLink to="/login" className="font-medium text-primary">
          {t("navigation.signInAuth")}
        </NavLink>
      </p>
    </form>
  );
}

export default BasicUserInformation;
