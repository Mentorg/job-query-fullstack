import { useTranslation } from "react-i18next";
import Label from "../../../../../shared/components/form/Label";
import Option from "../../../../../shared/components/form/Option";
import Select from "../../../../../shared/components/form/Select";
import TextField from "../../../../../shared/components/form/TextField";
import Button from "../../../../../shared/components/ui/Button";
import Loading from "../../../../../shared/components/ui/Loading";
import { Experience } from "../../../../../shared/types/experience";
import { useGetLocations } from "../../../../hooks/useGetLocations";
import { useUpdateExperience } from "../../hooks/useUpdateExperience";

type EditExperienceProps = {
  experience: Experience;
  onCloseModal: () => void;
};

function EditExperience({ experience, onCloseModal }: EditExperienceProps) {
  const transformedExperience = {
    ...experience,
    locationId: Array.isArray(experience.location)
      ? experience.location[0].id
      : experience.location.id,
  };
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateExperience(transformedExperience);
  const { locations, isPending, error } = useGetLocations();
  const { t } = useTranslation();

  if (isPending) return <Loading />;

  if (error) return <div>{t("system.serverError")}</div>;

  const sortedLocations = [...locations].sort((a, b) => {
    if (a.city < b.city) return -1;
    if (a.city > b.city) return 1;
    return 0;
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5 md:w-auto lg:w-auto">
      <div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="company">{t("label.companyName")}</Label>
          <TextField
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.company}
          />
        </div>
      </div>
      <div className="flex flex-col gap-x-4 md:grid md:grid-cols-2">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="title">{t("label.jobTitle")}</Label>
          <TextField
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.title}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="locationId">{t("label.location")}</Label>
          <Select
            name="locationId"
            value={form?.locationId}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.locationId}
          >
            {sortedLocations.map((location) => (
              <Option value={location.id} key={location.id}>
                {location.city}, {location.country}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-x-4 md:grid md:grid-cols-2">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="dateStart">{t("label.dateStart")}</Label>
          <TextField
            name="dateStart"
            type="text"
            value={form.dateStart}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.dateStart}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="dateEnd">{t("label.dateEnd")}</Label>
          <TextField
            name="dateEnd"
            type="text"
            value={form.dateEnd}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.dateEnd}
          />
        </div>
      </div>
      <Button className="mt-4 w-fit rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/75">
        {t("button.submit")}
      </Button>
    </form>
  );
}

export default EditExperience;
