import { useTranslation } from "react-i18next";
import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import Select from "../../shared/components/form/Select";
import Option from "../../shared/components/form/Option";
import Loading from "../../shared/components/ui/Loading";
import { useCreateRecruiter } from "../features/profiles/hooks/useCreateRecruiter";
import { useGetCompanies } from "../features/profiles/hooks/useGetCompanies";
import { useGetLocations } from "../hooks/useGetLocations";
import { Company } from "../../shared/types/company";
import { Location } from "../../shared/types/location";

function RecruiterForm() {
  const {
    form,
    errors,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitted,
  } = useCreateRecruiter();
  const {
    companies,
    isPending: isPendingCompanies,
    error: companiesError,
  } = useGetCompanies();
  const {
    locations,
    isPending: isPendingLocations,
    error: locationsError,
  } = useGetLocations();
  const { t } = useTranslation();

  if (isPendingCompanies || isPendingLocations) {
    return <Loading />;
  }

  if (companiesError || locationsError) {
    return <div>{t("system.serverError")}</div>;
  }

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center sm:gap-y-0">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-2xl">
          {t("pageTitle.createRecruiter")}
        </h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5 md:w-auto lg:w-auto"
        >
          <div className="flex flex-col gap-y-2">
            <div className="mt-4 flex flex-col gap-y-2">
              <Label htmlFor="avatar">{t("label.avatar")}</Label>
              <input
                type="file"
                name="avatar"
                accept="image/png, image/jpg, image/jpeg, image/svg+xml"
                onChange={handleFileChange}
              />
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
            <div className="mt-4 flex flex-col gap-y-2">
              <Label htmlFor="location">{t("label.location")}</Label>
              <Select
                name="location"
                value={form.location}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.location}
              >
                {locations.length > 0 ? (
                  locations.map((location: Location) => (
                    <Option value={location.id} key={location.id}>
                      {location.city}, {location.code}
                    </Option>
                  ))
                ) : (
                  <Option value="">{t("system.noLocation")}</Option>
                )}
              </Select>
            </div>
            <div className="mt-4 flex flex-col gap-y-2">
              <Label htmlFor="companies">{t("label.company")}</Label>
              <Select
                name="companies"
                value={form.companies}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.companies}
              >
                {companies.length > 0 ? (
                  companies.map((company: Company) => (
                    <Option value={company.id} key={company.id}>
                      {company.name}
                    </Option>
                  ))
                ) : (
                  <Option value="">{t("system.companyError")}</Option>
                )}
              </Select>
            </div>
            <Button className="mt-4 rounded-md bg-primary px-4 py-2 text-white">
              {t("button.recruiter")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecruiterForm;
