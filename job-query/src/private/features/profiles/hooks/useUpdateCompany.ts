import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateCompany } from "../../../../shared/services/apiCompany";
import { companyValidation as validation } from "../validation/companyValidation";
import { CompanyErrors, UpdateCompany } from "../../../../shared/types/company";

export function useUpdateCompany(company: UpdateCompany) {
  const [form, setForm] = useState<UpdateCompany>({
    id: company.id,
    name: company.name,
    email: company.email,
    phone: company.phone,
    description: company.description,
    address: company.address,
    facebook: company.facebook,
    linkedin: company.linkedin,
    twitter: company.twitter,
    website: company.website,
    slug: company.slug,
    locations: company.locations
      ? company.locations.every((loc) => typeof loc === "object" && "id" in loc)
        ? company.locations.map((location) => location.id)
        : []
      : [],
  });

  const [errors, setErrors] = useState<CompanyErrors>({
    name: "",
    email: "",
    phone: "",
    description: "",
    address: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    website: "",
    slug: "",
    locations: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: UpdateCompany) => updateCompany(company.id, form),
    onSuccess: () => {
      console.log("Mutation succeeded");
      queryClient.invalidateQueries();
      toast.success("Company data updated successfully.");
    },
    onError: (error) => {
      console.log("Mutation failed", error);
      toast.error("Failed to update company data! Error: " + error.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });
    let newValue;
    if (name === "locations") {
      newValue = value.split(",").map((id) => Number(id));
      console.log("Updated locations:", newValue);
    } else {
      newValue = value;
    }

    setForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: validation("name", form.name),
      email: validation("email", form.email),
      phone: validation("phone", form.phone),
      description: validation("description", form.description),
      address: validation("address", form.address),
      facebook: validation("facebook", form.facebook),
      linkedin: validation("linkedin", form.linkedin),
      twitter: validation("twitter", form.twitter),
      website: validation("website", form.website),
      slug: validation("slug", form.slug),
      locations: Array.isArray(form.locations)
        ? validation("locations", form.locations.join(","))
        : validation("locations", form.locations),
    };

    setErrors(newErrors as CompanyErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      await mutation.mutateAsync(form);
      console.log("Submission successful!", form);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message || "Updating company failed!",
        );
      }
      throw new Error("An unexpected error occurred!");
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isSubmitted,
  };
}
