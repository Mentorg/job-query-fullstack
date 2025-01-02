export const signupValidation = (
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
    (!value || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value))
  ) {
    return "Password must be at least 8 characters long and include letters, numbers, and special characters";
  }
  if (name === "password_confirmation" && formState?.password !== value) {
    return "Password confirmation does not match";
  }
  if (
    name === "phone" &&
    (!value ||
      !/^\+?(\d{1,4})?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,4}$/.test(
        value,
      ))
  ) {
    return "Please enter a valid phone number";
  }
  if (
    name === "linkedin_profile" &&
    (!value || !/^[a-zA-Z\s]{4,}$/.test(value))
  ) {
    return "Please enter a social media slug with a minimum of 4 characters";
  }
  if (name === "locations" && value.length === 0) {
    return "Please enter at least one location";
  }
  if (name === "timezone" && value.length === 0) {
    return "Please enter at least one time zone";
  }
  if (name === "language" && value.length === 0) {
    return "Please enter at least one language";
  }
  return "";
};
