export const loginValidation = (name: string, value: string) => {
  if (
    name === "email" &&
    (!value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
  ) {
    return "Please provide a valid email address";
  }

  if (name === "password" && (!value || value.length < 6)) {
    return "Password must be at least 6 characters long";
  }

  return "";
};
