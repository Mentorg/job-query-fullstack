export const contactValidation = (name: string, value: string) => {
  if (name === "name" && (!value || !/^[a-zA-Z\s]{4,}$/.test(value))) {
    return "Please enter a name with a minimum of 4 characters";
  }
  if (
    name === "email" &&
    (!value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
  ) {
    return "Please provide a valid email address";
  }
  if (name === "message" && (!value || !/^[\s\S]{10,500}$/.test(value))) {
    return "Please provide a company overview between 10 and 500 characters";
  }
};
