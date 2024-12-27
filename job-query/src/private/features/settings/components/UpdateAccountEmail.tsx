import { useUpdateEmail } from "../hooks/useUpdateEmail";
import Label from "../../../../shared/components/form/Label";
import TextField from "../../../../shared/components/form/TextField";
import Button from "../../../../shared/components/ui/Button";
import { User } from "../../../../shared/types/user";

type UpdateEmailProps = {
  resource: Partial<User> | null;
  onCloseModal: () => void;
};

function UpdateAccountEmail({ resource, onCloseModal }: UpdateEmailProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateEmail(resource);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Email Address</Label>
          <TextField
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.email}
          />
        </div>
        <Button className="mt-4 rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/70">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpdateAccountEmail;
