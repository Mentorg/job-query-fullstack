import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateApplicantEducation } from "../../../../shared/services/apiUser";
import { educationValidation as validation } from "../validation/educationValidation";
import { Education, EducationErrors } from "../../../../shared/types/education";

export function useUpdateEducation(educationData: Education) {
  const [form, setForm] = useState({
    department: educationData.department,
    degree: educationData.degree,
    university: educationData.university,
    honors: educationData.honors,
    gpa: educationData.gpa,
    dateStart: educationData.dateStart,
    dateEnd: educationData.dateEnd,
  });

  const [errors, setErrors] = useState<EducationErrors>({
    department: "",
    degree: "",
    university: "",
    honors: "",
    gpa: "",
    dateStart: "",
    dateEnd: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation<void, AxiosError, typeof form>({
    mutationFn: () =>
      updateApplicantEducation(
        {
          ...form,
          id: educationData.id,
          applicantId: educationData.applicantId,
        },
        educationData.id,
        educationData.applicantId,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Education data updated successfully.");
    },
    onError: (error) => {
      toast.error("Failed to update education data! Error: " + error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validation(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: EducationErrors = {
      department: validation("department", form.department),
      degree: validation("degree", form.degree),
      university: validation("university", form.university),
      honors: validation("honors", form.honors),
      gpa: validation("gpa", form.gpa),
      dateStart: validation("dateStart", form.dateStart),
      dateEnd: validation("dateEnd", form.dateEnd),
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
      await mutation.mutateAsync(form);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data.message ||
            "Updating applicant's education data failed!",
        );
      }
      throw new Error("An unexpected error occurred!");
    }
  };

  return { form, errors, handleChange, handleSubmit, isSubmitted };
}
