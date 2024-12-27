import Label from "../../../../../shared/components/form/Label";
import TextField from "../../../../../shared/components/form/TextField";
import TextArea from "../../../../../shared/components/form/TextArea";
import Button from "../../../../../shared/components/ui/Button";
import { useUpdateCompany } from "../../hooks/useUpdateCompany";
import { Company } from "../../../../../shared/types/company";
import { useGetLocations } from "../../../../hooks/useGetLocations";
import Select from "../../../../../shared/components/form/Select";
import { Location } from "../../../../../shared/types/location";
import Option from "../../../../../shared/components/form/Option";
import Loading from "../../../../../shared/components/ui/Loading";

type UpdateCompanyProps = {
  profile: Company;
  onCloseModal: () => void;
};

function UpdateCompany({ profile, onCloseModal }: UpdateCompanyProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateCompany(profile);
  const { locations, isPending, error } = useGetLocations();

  if (isPending) return <Loading />;

  if (error) return <div>Error: {error.message}</div>;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <div className="flex w-full flex-col gap-y-10">
      <div className="pt-4">
        <h1 className="text-2xl font-medium lg:text-3xl">Company Profile</h1>
      </div>
      <form onSubmit={submit} className="relative">
        <div className="flex justify-end">
          <Button className="rounded-md bg-primary px-6 py-2 text-white hover:bg-opacity-80">
            Submit
          </Button>
        </div>
        <div className="mt-5 flex flex-col gap-10 md:w-auto lg:w-fit">
          <div className="flex flex-col 2xl:grid 2xl:grid-cols-[1fr_4fr] 2xl:grid-rows-1">
            <div className="w-max">
              <h2 className="font-medium">Company Name</h2>
            </div>
            <div className="mt-4 flex w-full flex-col">
              <div className="flex flex-col">
                <TextField
                  name="name"
                  type="text"
                  value={form?.name}
                  onChange={handleChange}
                  errors={errors}
                  hasError={isSubmitted && !!errors.name}
                />
              </div>
              <div className="mt-2 flex flex-col sm:flex-row">
                <p className="rounded-md border-2 border-slate-300 bg-slate-100 px-6 py-2 text-slate-400">
                  jobquery.com/company/
                </p>
                <TextField
                  name="slug"
                  type="text"
                  value={form?.slug}
                  onChange={handleChange}
                  errors={errors}
                  hasError={isSubmitted && !!errors.slug}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col 2xl:grid 2xl:grid-cols-[1fr_4fr] 2xl:grid-rows-1">
            <div className="w-max">
              <h2 className="font-medium">Company Overview</h2>
            </div>
            <div className="mt-4 flex w-full flex-col">
              <div className="flex w-full flex-col">
                <TextArea
                  name="description"
                  value={form?.description}
                  onChange={handleChange}
                  errors={errors}
                  hasError={isSubmitted && !!errors.description}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col 2xl:grid 2xl:grid-cols-[1fr_4fr] 2xl:grid-rows-1">
            <div className="w-max">
              <h2 className="font-medium">Contact</h2>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <TextField
                  name="email"
                  type="text"
                  value={form?.email}
                  onChange={handleChange}
                  errors={errors}
                  hasError={isSubmitted && !!errors.email}
                />
              </div>
              <div className="mt-2 flex flex-col rounded-md border-2 border-slate-300 sm:flex-row">
                <p className="border-r-2 border-r-slate-300 bg-slate-100 px-6 py-2 text-slate-400">
                  twitter.com/
                </p>
                <TextField
                  name="facebook"
                  type="text"
                  value={form?.facebook}
                  onChange={handleChange}
                  errors={errors}
                  hasError={isSubmitted && !!errors.facebook}
                />
              </div>
              <div className="mt-2 flex flex-col rounded-md border-2 border-slate-300 sm:flex-row">
                <p className="border-r-2 border-r-slate-300 bg-slate-100 px-6 py-2 text-slate-400">
                  facebook.com/
                </p>
                <TextField
                  name="linkedin"
                  type="text"
                  value={form?.linkedin}
                  onChange={handleChange}
                  errors={errors}
                  hasError={isSubmitted && !!errors.linkedin}
                />
              </div>
              <div className="mt-2 flex flex-col rounded-md border-2 border-slate-300 sm:flex-row">
                <p className="border-r-2 border-r-slate-300 bg-slate-100 px-6 py-2 text-slate-400">
                  linkedin.com/company/
                </p>
                <TextField
                  name="twitter"
                  type="text"
                  value={form?.twitter}
                  onChange={handleChange}
                  errors={errors}
                  hasError={isSubmitted && !!errors.twitter}
                />
              </div>
              <div className="mt-2 flex flex-col">
                <Label htmlFor="website">Website</Label>
                <div className="mt-4 flex flex-col rounded-md border-2 border-slate-300 sm:flex-row">
                  <p className="border-r-2 border-r-slate-300 bg-slate-100 px-6 py-2 text-slate-400">
                    https://
                  </p>
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
              <div className="mt-2 flex flex-col">
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
              <div className="mt-2 flex flex-col">
                <Label htmlFor="address">Address</Label>
                <TextField
                  name="address"
                  type="text"
                  value={form?.address}
                  onChange={handleChange}
                  errors={errors}
                  hasError={isSubmitted && !!errors.address}
                />
              </div>
              <div className="mt-2 flex flex-col">
                <Label htmlFor="locations">Location(s)</Label>
                <Select
                  name="locations"
                  value={form?.locations}
                  onChange={handleChange}
                  errors={errors}
                  hasError={isSubmitted && !!errors.locations}
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateCompany;
