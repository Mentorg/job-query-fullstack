export const cardValidation = (name: string, value: string) => {
  if (name === "cardType" && !value) {
    return "Please select an option";
  }
  if (name === "cardNumber" && !/^\d{13,16}$/.test(value)) {
    return "Please enter a valid credit card number.";
  }
  if (
    name === "expirationDate" &&
    !/^(0[1-9]|1[0-2])\/(2[2-9]|[3-9][0-9])$/.test(value)
  ) {
    return "Please enter a valid expiration date (MM/YY).";
  }
  if (name === "cvv" && !/^\d{3,4}$/.test(value)) {
    return "Please enter a valid CVV (3 or 4 digits).";
  }
};
