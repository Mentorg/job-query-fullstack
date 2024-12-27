export const educationValidation = (name: string, value: string) => {
  if (name === "department" && (!value || !/^[a-zA-Z\s]{2,}$/.test(value))) {
    return "Please enter a valid department name (minimum 2 characters)";
  }
  if (name === "degree" && (!value || !/^[a-zA-Z\s]{2,}$/.test(value))) {
    return "Please enter a valid degree name (minimum 2 characters)";
  }
  if (name === "university" && (!value || !/^[a-zA-Z\s]{2,}$/.test(value))) {
    return "Please enter a valid university name (minimum 2 characters)";
  }
  if (
    name === "honors" &&
    (!value || !/^[a-zA-Z0-9\s'(),.-]{4,}$/.test(value))
  ) {
    return "Please enter valid honors (minimum 4 characters)";
  }
  if (
    name === "gpa" &&
    (!value ||
      !/^([0-3]\.\d{1,2}|4\.0{1,2}|[0-4](\.\d{1,2})?|5(\.0{1,2})?)$/.test(
        value,
      ))
  ) {
    return "Please enter a valid GPA (e.g., 3.50)";
  }
  if (
    (name === "dateStart" || name === "dateEnd") &&
    (!value || !/^\d{2}\.\d{2}\.\d{4}$/.test(value)) // Updated regex for DD.MM.YYYY format
  ) {
    return "Please enter a valid date in DD.MM.YYYY format";
  }
  return "";
};
