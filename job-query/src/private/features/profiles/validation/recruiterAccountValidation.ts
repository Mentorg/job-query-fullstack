export const recruiterAccountValidation = (
  name: string,
  value: string,
  passwordValue?: string,
) => {
  if (name === "name" && (!value || !/^[A-Za-z\s]+$/.test(value))) {
    return "Please provide a valid name (only letters and spaces).";
  }

  if (
    name === "role" &&
    (!value || !/^(recruiter|applicant|admin)$/.test(value))
  ) {
    return "Role must be one of 'recruiter', 'applicant', or 'admin'.";
  }

  if (
    name === "email" &&
    (!value || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
  ) {
    return "Please provide a valid email address.";
  }

  if (
    name === "password" &&
    (!value || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value))
  ) {
    return "Password must be at least 8 characters long and include at least one letter and one number.";
  }

  if (name === "password_confirmation" && value !== passwordValue) {
    return "Password confirmation does not match the password.";
  }

  if (name === "companies" && (!value || !/^\d+$/.test(value))) {
    return "Please provide a valid number for the company.";
  }

  return "";
};
