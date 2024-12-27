export const registrationValidation = (
  name: string,
  value: string,
  formState?: { password?: string; password_confirmation?: string },
) => {
  if (name === "name" && (!value || !/^[a-zA-Z\s]{4,}$/.test(value))) {
    return "Please enter a full name with a minimum of 4 characters";
  }

  if (
    name === "email" &&
    (!value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
  ) {
    return "Please provide a valid email address";
  }

  if (
    name === "password" &&
    (!value ||
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        value,
      ))
  ) {
    return "Password must be at least 8 characters long and include letters, numbers, and special characters";
  }

  if (name === "password_confirmation" && formState?.password !== value) {
    return "Password confirmation does not match";
  }

  return ""; // If no error, return empty string
};
