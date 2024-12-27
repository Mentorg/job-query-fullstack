import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateApplicationNote } from "../../../../shared/services/apiApplication";
import { DetailedApplication } from "../../../../shared/types/application";

export function useUpdateApplicationNote(application: DetailedApplication) {
  const [form, setForm] = useState({
    note: application.note,
  });

  const [errors, setErrors] = useState({
    note: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (form: { note: string }) =>
      updateApplicationNote(form, application.id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Application note updated successfully.");
    },
    onError: (error) => {
      toast.error("Failed to update application note! Error: " + error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error =
      value.trim() === "" ? "Please provide a more descriptive note." : "";
    setErrors({ ...errors, [name]: error });
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutation.mutate(form);
      console.log("Submission successfull.");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message || "Updating note failed!",
        );
      }
      throw new Error("An unexpected error occurred!");
    }
  };

  return { form, errors, handleChange, handleSubmit };
}
