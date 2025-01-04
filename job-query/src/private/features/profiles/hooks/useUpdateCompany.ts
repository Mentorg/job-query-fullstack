import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
      ? company.locations.map((location) =>
          typeof location === "object" && "id" in location
            ? location.id
            : location,
        )
      : [],
    avatar: company.avatar,
  });

  const [errors, setErrors] = useState<CompanyErrors>({
    name: "",
    email: "",
    description: "",
    address: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    locations: "",
    phone: "",
    website: "",
    slug: "",
    avatar: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateCompany(company.id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Company updated successfully.");
    },
    onError: (error) => {
      toast.error("Failed to update company! Error: " + error.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });

    let newValue;
    if (name === "locations") {
      newValue = Array.isArray(value) ? value.map(Number) : [Number(value)];
    } else {
      newValue = value;
    }

    setForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const validateForm = () => {
    const newErrors = {
      name: validation("name", form.name),
      email: validation("email", form.email),
      description: validation("description", form.description),
      address: validation("address", form.address),
      facebook: validation("facebook", form.facebook),
      linkedin: validation("linkedin", form.linkedin),
      twitter: validation("twitter", form.twitter),
      locations: validation("locations", form.locations),
      phone: validation("phone", form.phone),
      website: validation("website", form.website),
      slug: validation("slug", form.slug),
      avatar: validation("avatar", form.avatar),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) return;

    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof typeof errors],
    );

    if (errorFields.length > 0) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("description", form.description);
    formData.append("address", form.address);
    formData.append("facebook", form.facebook);
    formData.append("linkedin", form.linkedin);
    formData.append("twitter", form.twitter);
    formData.append("website", form.website);
    formData.append("slug", form.slug);
    formData.append("phone", form.phone);

    form.locations.forEach((location) => {
      formData.append("locations[]", location.toString());
    });

    if (file) {
      formData.append("avatar", file);
    }

    mutation.mutate(formData);
  };

  return {
    form,
    errors,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitted,
  };
}
