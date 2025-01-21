import { useTranslation } from "react-i18next";
import Label from "../../../../../shared/components/form/Label";
import TextField from "../../../../../shared/components/form/TextField";
import Select from "../../../../../shared/components/form/Select";
import Option from "../../../../../shared/components/form/Option";
import Button from "../../../../../shared/components/ui/Button";
import Loading from "../../../../../shared/components/ui/Loading";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useGetLocations } from "../../../../hooks/useGetLocations";
import { User } from "../../../../../shared/types/user";

type RecruiterFormProps = {
  profile: User | null;
  onCloseModal: () => void;
};

function UserForm({ profile, onCloseModal }: RecruiterFormProps) {
  const {
    form,
    errors,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitted,
  } = useUpdateUser(profile);
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
      <div className="mt-4 flex w-full flex-col gap-4">
        <div className="flex w-full justify-center">
          <img
            src={
              profile?.avatar
                ? profile?.avatar.includes("avatars")
                  ? `http://127.0.0.1:8000/storage/${form.avatar}`
                  : `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${profile?.avatar}`
                : `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-logo.svg`
            }
            alt="User's avatar"
            className="w-[5rem] rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-gray-500 file:hover:bg-gray-200"
          />
        </div>
      </div>
      <div className="flex flex-col gap-x-4 md:grid md:grid-cols-2">
        <div className="flex w-full flex-col gap-y-2">
          <Label htmlFor="name">{t("label.name")}</Label>
          <TextField
            name="name"
            type="text"
            value={form?.name}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.name}
          />
        </div>
        <div className="flex w-full flex-col gap-y-2">
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
        <div className="flex w-full flex-col gap-y-2">
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
        <div className="flex w-full flex-col gap-y-2">
          <Label htmlFor="linkedinProfile">{t("label.linkedin")}</Label>
          <TextField
            name="linkedinProfile"
            type="text"
            value={form?.linkedinProfile}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.linkedinProfile}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="rounded-md bg-primary px-6 py-2 text-white">
          {t("button.confirm")}
        </Button>
      </div>
    </form>
  );
}

export default UserForm;
