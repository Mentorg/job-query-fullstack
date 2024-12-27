import Label from "../../../../shared/components/form/Label";
import Select from "../../../../shared/components/form/Select";
import Option from "../../../../shared/components/form/Option";
import Button from "../../../../shared/components/ui/Button";
import { timezones } from "../data/timezones";
import { User } from "../../../../shared/types/user";
import { useUpdateLocaleSettings } from "../hooks/useUpdateLocaleSettings";

type UpdateTimezoneProps = {
  resource: Partial<User> | null;
  onCloseModal: () => void;
};

function UpdateTimezone({ resource, onCloseModal }: UpdateTimezoneProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateLocaleSettings(resource);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="mt-4 flex flex-col gap-y-2">
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
      <Button className="mt-4 rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/70">
        Submit
      </Button>
    </form>
  );
}

export default UpdateTimezone;
