export const passwordValidation = (name: string, value: string) => {
  if (name === "current_password" && !value) {
    return "Please enter your current password.";
  }
  if (name === "new_password" && !value) {
    return "Please enter a new password.";
  }
  if (name === "new_password_confirmation" && !value) {
    return "Please confirm your new password.";
  }
};
