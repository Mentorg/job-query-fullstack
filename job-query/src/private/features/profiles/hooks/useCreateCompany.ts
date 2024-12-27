import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCompany } from "../../../../shared/services/apiCompany";
import { companyValidation as validation } from "../validation/companyValidation";
import {
  CompanyErrors,
  CreateCompanyErrors,
} from "../../../../shared/types/company";

export function useCreateCompany() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    address: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    locations: [],
    phone: "",
    website: "",
    slug: "",
    avatar: "",
  });
  const [errors, setErrors] = useState<CreateCompanyErrors>({
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

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => createCompany(formData),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Company created successfully.");
      navigate("/admin/companies");
    },
    onError: (error) => {
      toast.error("Failed to create company! Error: " + error.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target as HTMLInputElement;
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
    console.log("Selected file:", selectedFile);
  };

  const validateForm = () => {
    const newErrors: CreateCompanyErrors = {
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
      slug: validation("slug", form.website),
      avatar: validation("avatar", form.website),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof CompanyErrors],
    );
    if (errorFields.length > 0) return;

    console.log("Form data before submission:", form);

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
    form.locations.forEach((location: string, index: number) => {
      formData.append(`locations[${index}]`, location);
    });
    if (file) {
      formData.append("avatar", file);
    }

    // Log FormData content
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
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
