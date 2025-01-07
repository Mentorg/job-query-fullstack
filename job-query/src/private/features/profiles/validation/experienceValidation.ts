export const experienceValidation = (name: string, value: string) => {
  if (name === "company" && (!value || !/^[a-zA-Z\s]{2,}$/.test(value))) {
    return "Please enter a valid company name (minimum 2 characters)";
  }
  if (name === "title" && (!value || !/^[a-zA-Z\s]{2,}$/.test(value))) {
    return "Please enter a valid position title (minimum 2 characters)";
  }
  if (name === "locationId" && !value) {
    return "Please select a location";
  }
  if (
    (name === "dateStart" || name === "dateEnd") &&
    (!value || !/^\d{2}\.\d{2}\.\d{4}$/.test(value))
  ) {
    return "Please enter a valid date in DD.MM.YYYY format";
  }
  return "";
};
