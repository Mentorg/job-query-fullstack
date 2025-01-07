import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../../../shared/services/apiUser";
import { userValidation as validation } from "../validation/userValidation";
import { User, UserErrors } from "../../../../shared/types/user";

export function useUpdateUser(user: User | null) {
  const [form, setForm] = useState({
    avatar: user?.avatar,
    name: user?.name,
    phone: user?.phone,
    linkedinProfile: user?.linkedinProfile,
    locationId: user?.location?.id || 0,
  });

  const [errors, setErrors] = useState<UserErrors>({
    avatar: "",
    name: "",
    phone: "",
    linkedinProfile: "",
    locationId: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      if (!user?.id) {
        throw new Error("User is missing.");
      }

      if (!formData) {
        throw new Error("Form data is missing.");
      }

      return updateUser(user.id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Your personal details have been updated successfully.");
    },
    onError: (error) => {
      toast.error(
        "Failed to update your personal details! Error: " + error.message,
      );
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target as HTMLInputElement;

    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });

    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const validateForm = () => {
    const newErrors: UserErrors = {
      name: "",
      phone: "",
      linkedinProfile: "",
      locationId: "",
      avatar: "",
    };

    newErrors.name = validation("name", form.name || "") || "";
    newErrors.phone = validation("phone", form.phone || "") || "";
    newErrors.linkedinProfile =
      validation("linkedinProfile", form.linkedinProfile || "") || "";
    newErrors.locationId =
      validation("locationId", form.locationId.toString() || "") || "";
    newErrors.avatar = validation("avatar", form.avatar || "") || "";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) return;

    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof typeof errors],
    );

    if (errorFields.length > 0) return;

    const formData = new FormData();
    formData.append("name", form.name || "");
    formData.append("phone", form.phone || "");
    formData.append("linkedinProfile", form.linkedinProfile || "");
    formData.append("locationId", form.locationId.toString());

    if (file) {
      formData.append("avatar", file);
    } else {
      formData.append("avatar", "");
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
