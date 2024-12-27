export const userValidation = (name: string, value: string) => {
  if (name === "name" && (!value || !/^[a-zA-Z\s]{4,}$/.test(value))) {
    return "Please enter a name with a minimum of 4 characters";
  }
  if (name === "phone" && (!value || !/^\+?[0-9\s-]{8,}$/.test(value))) {
    return "Please enter a valid phone number.";
  }
  if (
    name === "linkedin_profile" &&
    (!value || !/^[a-zA-Z\s]{4,}$/.test(value))
  ) {
    return "Please enter a link to LinkedIn profile with a minimum of 4 characters";
  }
  if (name === "location_id" && !value) {
    return `Please select an option.`;
  }
};
