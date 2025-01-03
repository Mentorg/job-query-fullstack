import Label from "../../../../../shared/components/form/Label";
import TextField from "../../../../../shared/components/form/TextField";
import Select from "../../../../../shared/components/form/Select";
import Option from "../../../../../shared/components/form/Option";
import Button from "../../../../../shared/components/ui/Button";
import Loading from "../../../../../shared/components/ui/Loading";
import { User } from "../../../../../shared/types/user";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useGetLocations } from "../../../../hooks/useGetLocations";

type RecruiterFormProps = {
  profile: User | null;
  onCloseModal: () => void;
};

function UserForm({ profile, onCloseModal }: RecruiterFormProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateUser(profile);
  const { locations, isPending, error } = useGetLocations();

  if (isPending) return <Loading />;

  if (error) return <div>Error: {error.message}</div>;

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
      <div className="flex flex-col gap-x-4 md:grid md:grid-cols-2">
        <div className="flex w-full flex-col gap-y-2">
          <Label htmlFor="name">Full Name</Label>
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
          <Label htmlFor="country">Country</Label>
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
          <Label htmlFor="phone">Phone Number</Label>
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
          <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
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
          Confirm
        </Button>
      </div>
    </form>
  );
}

export default UserForm;
