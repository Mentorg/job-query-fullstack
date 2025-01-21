import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthenticationContainer from "../components/AuthenticationContainer";
import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import { useLogin } from "../hooks/useLogin";

export function Login() {
  const { errors, loginForm, handleChange, handleSubmit, isSubmitted } =
    useLogin();
  const { t } = useTranslation();

  return (
    <AuthenticationContainer>
      <form
        onSubmit={handleSubmit}
        className="m-auto flex w-[90dvw] flex-col rounded-md bg-white p-10 md:w-max"
      >
        <div className="rounded-md bg-slate-100 px-8 py-2">
          <h2 className="my-2 font-medium">{t("auth.adminCredentials")}:</h2>
          <p className="text-sm">
            <span className="font-medium">{t("auth.email")}:</span>{" "}
            robertbrown@jobquery.com
          </p>
          <p className="text-sm">
            <span className="font-medium">{t("auth.password")}:</span>{" "}
            robertbrown
          </p>
        </div>
        <div className="rounded-md bg-slate-100 px-8 py-2">
          <h2 className="my-2 font-medium">
            {t("auth.recruiterCredentials")}:
          </h2>
          <p className="text-sm">
            <span className="font-medium">{t("auth.email")}:</span>{" "}
            janedoe@innovize.com
          </p>
          <p className="text-sm">
            <span className="font-medium">{t("auth.password")}:</span> janedoe
          </p>
        </div>
        <div className="rounded-md bg-slate-100 px-8 py-2">
          <h2 className="my-2 font-medium">
            {t("auth.applicantCredentials")}:
          </h2>
          <p className="text-sm">
            <span className="font-medium">{t("auth.email")}:</span>{" "}
            johnsmith@applicant.com
          </p>
          <p className="text-sm">
            <span className="font-medium">{t("auth.password")}:</span> johnsmith
          </p>
        </div>
        <div className="py-4 lg:py-10">
          <h1 className="text-xl font-medium lg:text-3xl">{t("auth.title")}</h1>
          <p className="mt-2 text-lg font-medium text-slate-700 lg:text-2xl">
            {t("auth.headlineLogin")}
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="email">{t("label.email")}</Label>
          <TextField
            name="email"
            type="email"
            value={loginForm.email}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.email}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="password">{t("label.password")}</Label>
          <TextField
            name="password"
            type="password"
            value={loginForm.password}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.password}
          />
        </div>
        <Button className="mt-4 rounded-md bg-primary px-4 py-2 text-white">
          {t("button.login")}
        </Button>
        <p className="mt-4 text-sm">
          {t("auth.noAccount")}{" "}
          <NavLink to="/signup" className="font-medium text-blue-600">
            {t("navigation.signUpAuth")}
          </NavLink>
        </p>
        <NavLink to="/" className="mt-2 text-sm text-blue-600">
          {t("navigation.browseJobs")}
        </NavLink>
      </form>
    </AuthenticationContainer>
  );
}
