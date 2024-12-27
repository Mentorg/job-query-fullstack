import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import Select from "../../shared/components/form/Select";
import Option from "../../shared/components/form/Option";
import Loading from "../../shared/components/ui/Loading";
import { useCreateRecruiter } from "../features/profiles/hooks/useCreateRecruiter";
import { useGetCompanies } from "../features/profiles/hooks/useGetCompanies";
import { Company } from "../../shared/types/company";

function RecruiterForm() {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useCreateRecruiter();
  const { companies, isPending, error } = useGetCompanies();

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to fetch companies!</div>;
  }

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center sm:gap-y-0">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-2xl">
          Create Recruiter
        </h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5 md:w-auto lg:w-auto"
        >
          <div className="flex flex-col gap-y-2">
            <div className="mt-4 flex flex-col gap-y-2">
              <Label htmlFor="name">Full Name</Label>
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
              <Label htmlFor="email">Email Address</Label>
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
              <Label htmlFor="password">Password</Label>
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
              <Label htmlFor="password_confirmation">Confirm Password</Label>
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
              <Label htmlFor="companies">Company</Label>
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
                  <Option value="">No companies available</Option>
                )}
              </Select>
            </div>
            <Button className="mt-4 rounded-md bg-primary px-4 py-2 text-white">
              Create Recruiter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecruiterForm;
