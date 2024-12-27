import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: User | null) => {
      if (!user?.id) {
        throw new Error("User is missing.");
      }

      if (!form) {
        throw new Error("Form data is missing.");
      }

      return updateUser(user.id, form);
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

  const validateForm = () => {
    const newErrors: UserErrors = {
      avatar: "",
      name: validation("name", form.name || ""),
      phone: validation("phone", form.phone || ""),
      linkedinProfile: validation(
        "linkedinProfile",
        form.linkedinProfile || "",
      ),
      locationId: validation("locationId", form.locationId.toString() || ""),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      await mutation.mutateAsync(form as User | null);
      console.log("Submission successful!", form);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message || "Updating user failed!",
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
