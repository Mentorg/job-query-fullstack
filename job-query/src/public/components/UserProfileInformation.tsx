import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import Select from "../../shared/components/form/Select";
import Option from "../../shared/components/form/Option";
import Loading from "../../shared/components/ui/Loading";
import { useGetLocations } from "../../private/hooks/useGetLocations";
import { timezones } from "../../private/features/settings/data/timezones";
import { Location } from "../../shared/types/location";
import { SignupErrors, SignupProps } from "../../shared/types/user";
import Button from "../../shared/components/ui/Button";
import Logo from "./Logo";

function UserProfileInformation({
  form,
  errors,
  handleChange,
  handleFileChange,
  handleSubmit,
  isSubmitted,
}: {
  form: SignupProps;
  errors: SignupErrors;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitted: boolean;
}) {
  const { locations, isPending, error } = useGetLocations();

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching location data</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex h-lvh flex-col place-items-center justify-center">
        <div className="mt-8 flex justify-center">
          <Logo mode="dark" />
        </div>
        <div className="my-8 flex flex-col items-center">
          <h1 className="text-3xl font-medium text-slate-600">
            Tell Us More About You
          </h1>
          <p className="my-4 text-lg text-slate-500">
            Let's personalize your profile with a few more details.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="m-auto flex w-[90dvw] flex-col gap-4 rounded-md bg-white p-10 md:m-0 md:w-max"
        >
          <div className="my-2 flex flex-col items-center gap-4">
            <Label htmlFor="avatar">Avatar</Label>
            <input
              type="file"
              name="avatar"
              accept="image/png, image/jpg, image/jpeg, image/svg+xml"
              onChange={handleFileChange}
              className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-gray-500 file:hover:bg-gray-200"
            />
          </div>
          <div className="my-2 grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="flex flex-col">
              <Label htmlFor="phone">Phone</Label>
              <TextField
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.phone}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="linkedin_profile">LinkedIn</Label>
              <TextField
                name="linkedin_profile"
                type="text"
                value={form.linkedin_profile}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.linkedin_profile}
              />
            </div>
          </div>
          <div className="my-2 grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="flex flex-col">
              <Label htmlFor="location">Location</Label>
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
                  <Option value="">No locations available</Option>
                )}
              </Select>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="timezone">Time Zone</Label>
              <Select
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.timezone}
              >
                {timezones.map((timezone) => (
                  <Option value={timezone} key={timezone}>
                    {timezone}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="my-2 flex flex-col md:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="language">Language</Label>
              <Select
                name="language"
                value={form.language}
                onChange={handleChange}
                errors={errors}
                hasError={isSubmitted && !!errors.language}
              >
                {["English", "German", "French"].map((language) => (
                  <Option value={language} key={language}>
                    {language}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <Button className="mt-4 rounded-md bg-primary px-4 py-2 text-white">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserProfileInformation;
