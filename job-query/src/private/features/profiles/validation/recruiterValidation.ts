export const recruiterValidation = (name: string, value: string) => {
  if (name === "expertise" && (!value || !/^[\s\S]{10,1500}$/.test(value))) {
    return "Please provide a description of your expertise between 10 and 1500 characters";
  }
  if (name === "description" && (!value || !/^[\s\S]{10,1500}$/.test(value))) {
    return "Please provide a description about you between 10 and 1500 characters";
  }
};
