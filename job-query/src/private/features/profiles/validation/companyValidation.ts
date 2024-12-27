import { Location } from "../../../../shared/types/location";

export const companyValidation = (
  name: string,
  value: string | string[] | number[] | Location[],
): string => {
  if (Array.isArray(value)) {
    // Special handling for array fields (e.g., locations)
    if (name === "locations" && value.length === 0) {
      return "Please enter at least one location";
    }
  } else if (typeof value === "string") {
    if (name === "name" && (!value || !/^[a-zA-Z\s]{4,}$/.test(value))) {
      return "Please enter a name with a minimum of 4 characters";
    }
    if (name === "slug" && (!value || !/^[a-zA-Z\s]{4,}$/.test(value))) {
      return "Please enter a slug with a minimum of 4 characters";
    }
    if (
      name === "description" &&
      (!value || !/^[\s\S]{10,2000}$/.test(value))
    ) {
      return "Please provide a company overview between 10 and 2000 characters";
    }
    if (
      name === "email" &&
      (!value || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
    ) {
      return "Please provide a valid email address";
    }
    if (name === "phone" && (!value || !/^\+?[0-9\s-]{8,}$/.test(value))) {
      return "Please enter a valid phone number";
    }
    if (name === "facebook" && (!value || !/^[a-zA-Z\s]{4,}$/.test(value))) {
      return "Please enter a social media slug with a minimum of 4 characters";
    }
    if (name === "twitter" && (!value || !/^[a-zA-Z\s]{4,}$/.test(value))) {
      return "Please enter a social media slug with a minimum of 4 characters";
    }
    if (name === "linkedin" && (!value || !/^[a-zA-Z\s]{4,}$/.test(value))) {
      return "Please enter a social media slug with a minimum of 4 characters";
    }
    if (name === "address" && (!value || !/^[a-zA-Z0-9\s-]{4,}$/.test(value))) {
      return "Please enter an address with a minimum of 4 characters";
    }
    if (
      name === "website" &&
      (!value ||
        !/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i.test(value))
    ) {
      return "Please enter a valid website link.";
    }
  }
  return ""; // Return empty string if no error
};
