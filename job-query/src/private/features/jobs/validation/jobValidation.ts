export const jobValidation = (name: string, value: string) => {
  if (name === "title" && (!value || !/^[a-zA-Z\s]{4,}$/.test(value))) {
    return "Please enter a job title with a minimum of 4 characters";
  }
  if (
    name === "salary_from" &&
    (!value || !/^(300|\d{3,6})(?:\.\d{1,2})?$/.test(value))
  ) {
    return "Please enter a valid minimum salary (minimum: $100)";
  }
  if (
    name === "salary_to" &&
    (!value || !/^(300|\d{3,6})(?:\.\d{1,2})?$/.test(value))
  ) {
    return "Please enter a valid salary (minimum: $100)";
  }
  if (
    name === "position_overview" &&
    (!value || !/^[\s\S]{10,500}$/.test(value))
  ) {
    return "Please provide a position overview between 10 and 500 characters";
  }
  if (
    (name === "responsibilities" || name === "qualifications") &&
    (!value || !/^[\s\S]{10,500}(?:;\s*[\s\S]{10,500})*;?$/.test(value))
  ) {
    return "Please provide a list of responsibilities or qualifications separated by semicolons";
  }
  if (
    !value &&
    [
      "locations",
      "is_fulltime",
      "work_preference",
      "seniority",
      "experience",
      "education",
      "requires_visa_sponsorship",
      "salary_frequency",
    ].includes(name)
  ) {
    return `Please select an option for ${name.replace(/_/g, " ")}`;
  }
  return "";
};
