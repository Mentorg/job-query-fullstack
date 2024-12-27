import { NavLink } from "react-router-dom";
import AuthenticationContainer from "../components/AuthenticationContainer";
import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import { useSignup } from "../hooks/useSignup";

export function SignUp() {
  const { errors, signupForm, handleChange, handleSubmit, isSubmitted } =
    useSignup();

  return (
    <AuthenticationContainer>
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
            value={signupForm.name}
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
            value={signupForm.email}
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
            value={signupForm.password}
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
            value={signupForm.password_confirmation}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.password_confirmation}
          />
        </div>
        <Button className="mt-4 rounded-md bg-primary px-4 py-2 text-white">
          Create Account
        </Button>
        <p className="mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="font-medium text-primary">
            Sign in now
          </NavLink>
        </p>
      </form>
    </AuthenticationContainer>
  );
}
