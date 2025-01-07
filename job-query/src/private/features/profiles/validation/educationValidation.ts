export const educationValidation = (name: string, value: string) => {
  if (
    name === "department" &&
    (!value || !/^[a-zA-Z\s&,'().+-]+$/.test(value))
  ) {
    return "Please enter a valid department name (letters, spaces, and special characters allowed)";
  }
  if (name === "degree" && (!value || !/^[a-zA-Z\s&,'().+-]+$/.test(value))) {
    return "Please enter a valid degree name (letters, spaces, and special characters allowed)";
  }
  if (
    name === "university" &&
    (!value || !/^[a-zA-Z\s&,'().+-]+$/.test(value))
  ) {
    return "Please enter a valid university name (letters, spaces, and special characters allowed)";
  }
  if (name === "honors" && (!value || !/^[a-zA-Z0-9\s,.'()-]+$/.test(value))) {
    return "Please enter valid honors (only letters, numbers, and spaces allowed)";
  }
  if (
    name === "gpa" &&
    (!value || !/^([0-3]?\.\d{1,2}|4(\.0{1,2})?)$/.test(value))
  ) {
    return "Please enter a valid GPA (between 0 and 4.99)";
  }
  if (
    (name === "dateStart" || name === "dateEnd") &&
    (!value || !/^\d{2}\.\d{2}\.\d{4}$/.test(value))
  ) {
    return "Please enter a valid date in DD.MM.YYYY format";
  }
  return "";
};
