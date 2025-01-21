import { useTranslation } from "react-i18next";
import TextField from "../../shared/components/form/TextField";
import Label from "../../shared/components/form/Label";
import TextArea from "../../shared/components/form/TextArea";
import Button from "../../shared/components/ui/Button";
import Select from "../../shared/components/form/Select";
import Option from "../../shared/components/form/Option";
import Loading from "../../shared/components/ui/Loading";
import { useGetLocations } from "../hooks/useGetLocations";
import { useCreateCompany } from "../features/profiles/hooks/useCreateCompany";
import { Location } from "../../shared/types/location";

function CompanyForm() {
  const {
    form,
    errors,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitted,
  } = useCreateCompany();
  const { locations, isPending, error } = useGetLocations();
  const { t } = useTranslation();

  if (isPending) return <Loading />;

  if (error) return <div>{t("system.serverError")}</div>;

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center sm:gap-y-0">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-2xl">
          {t("pageTitle.createCompany")}
        </h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5 md:w-auto lg:w-9/12"
        >
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="name">{t("label.companyName")}</Label>
              <TextField
                name="name"
                type="text"
                value={form?.name}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.name}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label htmlFor="email">{t("label.email")}</Label>
              <TextField
                name="email"
                type="text"
                value={form?.email}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.email}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="avatar">{t("label.companyLogo")}</Label>
              <input
                type="file"
                name="avatar"
                accept="image/png, image/jpg, image/jpeg, image/svg+xml"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="description">{t("label.description")}</Label>
              <TextArea
                name="description"
                value={form?.description}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.description}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="address">{t("label.address")}</Label>
              <TextField
                name="address"
                type="text"
                value={form?.address}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.address}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="facebook">{t("label.facebook")}</Label>
              <TextField
                name="facebook"
                type="text"
                value={form?.facebook}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.facebook}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label htmlFor="linkedin">{t("label.linkedin")}</Label>
              <TextField
                name="linkedin"
                type="text"
                value={form?.linkedin}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.linkedin}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="twitter">{t("label.twitter")}</Label>
              <TextField
                name="twitter"
                type="text"
                value={form?.twitter}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.twitter}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label htmlFor="website">{t("label.website")}</Label>
              <TextField
                name="website"
                type="text"
                value={form?.website}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.website}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="slug">{t("label.slug")}</Label>
              <TextField
                name="slug"
                type="text"
                value={form?.slug}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.slug}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label htmlFor="phone">{t("label.phone")}</Label>
              <TextField
                name="phone"
                type="text"
                value={form?.phone}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.phone}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="locations">{t("label.locations")}</Label>
              <Select
                name="locations"
                value={form?.locations}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.locations}
                // multiple
              >
                {locations.map((location: Location) => (
                  <Option value={location.id} key={location.id}>
                    {location.city}, {location.country}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="rounded-md bg-primary px-6 py-2 text-white">
              {t("button.company")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyForm;
