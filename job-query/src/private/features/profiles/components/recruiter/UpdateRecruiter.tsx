import Label from "../../../../../shared/components/form/Label";
import TextArea from "../../../../../shared/components/form/TextArea";
import Button from "../../../../../shared/components/ui/Button";
import { Recruiter } from "../../../../../shared/types/user";
import { useUpdateRecruiter } from "../../hooks/useUpdateRecruiter";

type UpdateRecruiterProps = {
  recruiter: Recruiter;
  onCloseModal: () => void;
};

function UpdateRecruiter({ recruiter, onCloseModal }: UpdateRecruiterProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateRecruiter(recruiter);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5 md:w-auto lg:w-auto">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="expertise">Expertise</Label>
        <TextArea
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.expertise}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="description">About Me</Label>
        <TextArea
          name="description"
          value={form.description}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.description}
        />
      </div>
      <div className="flex justify-center">
        <Button className="rounded-md bg-primary px-6 py-2 text-white">
          Confirm
        </Button>
      </div>
    </form>
  );
}

export default UpdateRecruiter;
