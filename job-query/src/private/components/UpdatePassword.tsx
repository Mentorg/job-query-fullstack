import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import { useUpdatePassword } from "../features/settings/hooks/useUpdatePassword";

type UpdatePasswordProps = {
  onCloseModal: () => void;
};

function UpdatePassword({ onCloseModal }: UpdatePasswordProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdatePassword();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col md:flex-row md:gap-x-10">
      <div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="current_password">Current Password</Label>
          <TextField
            name="current_password"
            type="password"
            value={form.current_password}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.current_password}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="new_password">New Password</Label>
          <TextField
            name="new_password"
            type="password"
            value={form.new_password}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.new_password}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="new_password_confirmation">
            Confirm New Password
          </Label>
          <TextField
            name="new_password_confirmation"
            type="password"
            value={form.new_password_confirmation}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.new_password_confirmation}
          />
        </div>
        <Button className="mt-4 rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/70">
          Submit
        </Button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium">Instructions</h2>
        <ul className="mt-2">
          <li className="list-inside list-disc text-sm">
            At least one uppercase letter
          </li>
          <li className="list-inside list-disc text-sm">
            At least one lowercase letter
          </li>
          <li className="list-inside list-disc text-sm">At least one digit</li>
          <li className="list-inside list-disc text-sm">
            Minimum length of 8 characters
          </li>
        </ul>
      </div>
    </form>
  );
}

export default UpdatePassword;
