import { NavLink } from "react-router-dom";
import AuthenticationContainer from "../components/AuthenticationContainer";
import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import { useLogin } from "../hooks/useLogin";

export function Login() {
  const { errors, loginForm, handleChange, handleSubmit, isSubmitted } =
    useLogin();

  return (
    <AuthenticationContainer>
      <form
        onSubmit={handleSubmit}
        className="m-auto flex w-[90dvw] flex-col rounded-md bg-white p-10 md:w-max"
      >
        <div className="rounded-md bg-slate-100 px-8 py-2">
          <h2 className="my-2 font-medium">Super admin credentials:</h2>
          <p className="text-sm">
            <span className="font-medium">Email:</span> robertbrown@jobquery.com
          </p>
          <p className="text-sm">
            <span className="font-medium">Password:</span> robertbrown
          </p>
        </div>
        <div className="rounded-md bg-slate-100 px-8 py-2">
          <h2 className="my-2 font-medium">Recruiter credentials:</h2>
          <p className="text-sm">
            <span className="font-medium">Email:</span> janedoe@innovize.com
          </p>
          <p className="text-sm">
            <span className="font-medium">Password:</span> janedoe
          </p>
        </div>
        <div className="rounded-md bg-slate-100 px-8 py-2">
          <h2 className="my-2 font-medium">Applicant credentials:</h2>
          <p className="text-sm">
            <span className="font-medium">Email:</span> johnsmith@applicant.com
          </p>
          <p className="text-sm">
            <span className="font-medium">Password:</span> johnsmith
          </p>
        </div>
        <h1 className="py-4 text-xl font-medium lg:py-10 lg:text-3xl">
          Welcome to JobQuery <br />
          Sign into your account
        </h1>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="email">Email Address</Label>
          <TextField
            name="email"
            type="email"
            value={loginForm.email}
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
            value={loginForm.password}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.password}
          />
        </div>
        <Button className="mt-4 rounded-md bg-primary px-4 py-2 text-white">
          Log In
        </Button>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <NavLink to="/signup" className="font-medium text-blue-600">
            Sign up now
          </NavLink>
        </p>
        <NavLink to="/" className="mt-2 text-sm text-blue-600">
          Browse job ads without authentication
        </NavLink>
      </form>
    </AuthenticationContainer>
  );
}
