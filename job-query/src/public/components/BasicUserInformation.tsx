import { NavLink } from "react-router-dom";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import Label from "../../shared/components/form/Label";
import { SignupErrors, SignupProps } from "../../shared/types/user";

function BasicUserInformation({
  form,
  errors,
  handleChange,
  handleSubmit,
  isSubmitted,
}: {
  form: SignupProps;
  errors: SignupErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitted: boolean;
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex w-[90dvw] flex-col rounded-md bg-white p-10 md:m-0 md:w-max"
    >
      <h1 className="py-4 text-xl font-medium lg:py-10 lg:text-3xl">
        Welcome to JobQuery <br />
        Join Us Today: Register Now!
      </h1>
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
        <p className="text-xs text-slate-500">
          (Ensure the password is at least 8 characters and includes one
          number.)
        </p>
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
        <Label htmlFor="password_confirmation">Confirm Password </Label>
        <TextField
          name="password_confirmation"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.password_confirmation}
        />
      </div>
      <Button className="mt-4 rounded-md bg-primary px-4 py-2 text-white">
        Continue
      </Button>
      <p className="mt-4">
        Already have an account?{" "}
        <NavLink to="/login" className="font-medium text-primary">
          Sign in now
        </NavLink>
      </p>
    </form>
  );
}

export default BasicUserInformation;
