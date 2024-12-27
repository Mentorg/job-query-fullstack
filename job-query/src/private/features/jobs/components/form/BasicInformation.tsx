import Label from "../../../../../shared/components/form/Label";
import Select from "../../../../../shared/components/form/Select";
import Option from "../../../../../shared/components/form/Option";
import TextField from "../../../../../shared/components/form/TextField";
import Loading from "../../../../../shared/components/ui/Loading";
import { useCompanyLocation } from "../../hooks/useCompanyLocation";
import {
  CreateJob,
  UpdateJob,
  JobErrors,
} from "../../../../../shared/types/job";
import { Location } from "../../../../../shared/types/location";

type BasicInformationProps = {
  form: CreateJob | UpdateJob;
  errors: JobErrors;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
};

function BasicInformation({
  form,
  errors,
  handleChange,
}: BasicInformationProps) {
  const { locations, isPending, error } = useCompanyLocation();

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching location data</div>;
  }

  return (
    <>
      <h1 className="border-b-2 border-slate-300 py-4 text-2xl font-semibold xl:text-2xl">
        Basic Information
      </h1>
      <div className="my-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="title">Job Title</Label>
          <TextField
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.title}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="locations">Location</Label>
          <Select
            name="locations"
            value={form.locations[0] || ""}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.locations}
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
      <div className="my-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="workPreference">Work Preference</Label>
          <Select
            name="workPreference"
            value={form.workPreference}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.workPreference}
          >
            {["On-site", "Remote", "Hybrid"].map((work) => (
              <Option value={work} key={work}>
                {work}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Employment Type</p>
          <div className="flex h-full items-center gap-4">
            <div className="flex gap-2">
              <input
                type="radio"
                name="isFulltime"
                value="true"
                checked={form.isFulltime === true}
                onChange={handleChange}
                id="full-time"
              />
              <label htmlFor="full-time">Full Time</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="isFulltime"
                value="false"
                checked={form.isFulltime === false}
                onChange={handleChange}
                id="part-time"
              />
              <label htmlFor="part-time">Part Time</label>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="seniority">Job Seniority</Label>
          <Select
            name="seniority"
            value={form.seniority}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.seniority}
          >
            {["Intern", "Entry", "Junior", "Mid level", "Senior"].map(
              (seniority) => (
                <Option value={seniority} key={seniority}>
                  {seniority}
                </Option>
              ),
            )}
          </Select>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="experience">
            Minimum Qualification Level Required
          </Label>
          <Select
            name="experience"
            value={form.experience}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.experience}
          >
            {[0, 1, 2, 3, 4, 5].map((experience) => (
              <Option value={experience} key={experience}>
                {experience}{" "}
                {experience !== 0 && experience < 2 ? "Year" : "Years"} of
                Experience
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="my-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="education">Education Level</Label>
          <Select
            name="education"
            value={form.education}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.education}
          >
            {["High school diploma", "Bachelor's", "Master's", "Ph.D"].map(
              (education) => (
                <Option value={education} key={education}>
                  {education}
                </Option>
              ),
            )}
          </Select>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Can you provide Visa Sponsorship for this role?</p>
          <div className="flex h-full items-center gap-4">
            <div className="flex gap-2">
              <input
                type="radio"
                name="hasVisaSponsorship"
                value="true"
                checked={form.hasVisaSponsorship === true}
                onChange={handleChange}
                id="yes"
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="hasVisaSponsorship"
                value="false"
                checked={form.hasVisaSponsorship === false}
                onChange={handleChange}
                id="no"
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 grid grid-cols-1 grid-rows-[1fr_auto_1fr_1fr] gap-4 xl:grid-cols-[1fr_auto_1fr_1fr] xl:grid-rows-1">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="salaryFrom">Salary From</Label>
          <TextField
            name="salaryFrom"
            type="number"
            value={form.salaryFrom}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.salaryFrom}
          />
        </div>
        <span className="mb-3 flex items-end font-medium">to</span>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="salaryTo">Salary To</Label>
          <TextField
            name="salaryTo"
            type="number"
            value={form.salaryTo}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.salaryTo}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Salary Frequency</p>
          <div className="flex h-full items-center gap-4">
            <div className="flex gap-2">
              <input
                type="radio"
                name="isSalaryMonthly"
                value="true"
                checked={form.isSalaryMonthly === true}
                onChange={handleChange}
                id="monthly"
              />
              <label htmlFor="monthly">Monthly</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="isSalaryMonthly"
                value="false"
                checked={form.isSalaryMonthly === false}
                onChange={handleChange}
                id="annual"
              />
              <label htmlFor="annual">Annually</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicInformation;
