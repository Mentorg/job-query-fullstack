import Label from "../../../../../shared/components/form/Label";
import TextField from "../../../../../shared/components/form/TextField";
import Button from "../../../../../shared/components/ui/Button";
import { Education } from "../../../../../shared/types/education";
import { useUpdateEducation } from "../../hooks/useUpdateEducation";

type EditEducationProps = {
  education: Education;
  onCloseModal: () => void;
};

function EditEducation({ education, onCloseModal }: EditEducationProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateEducation(education);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5 md:w-auto lg:w-auto">
      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="department">Department</Label>
        <TextField
          name="department"
          type="text"
          value={form.department}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.department}
        />
      </div>
      <div className="flex flex-col gap-x-4 md:grid md:grid-cols-2">
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="degree">Degree</Label>
          <TextField
            name="degree"
            type="text"
            value={form.degree}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.degree}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="university">University</Label>
          <TextField
            name="university"
            type="text"
            value={form.university}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.university}
          />
        </div>
      </div>
      <div className="flex flex-col gap-x-4 md:grid md:grid-cols-2">
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="honors">Honors</Label>
          <TextField
            name="honors"
            type="text"
            value={form.honors}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.honors}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="gpa">GPA</Label>
          <TextField
            name="gpa"
            type="text"
            value={form.gpa}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.gpa}
          />
        </div>
      </div>
      <div className="flex flex-col gap-x-4 md:grid md:grid-cols-2">
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="dateStart">From (D.M.Y)</Label>
          <TextField
            name="dateStart"
            type="text"
            value={form.dateStart}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.dateStart}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <Label htmlFor="dateEnd">To (D.M.Y)</Label>
          <TextField
            name="dateEnd"
            type="text"
            value={form.dateEnd}
            onChange={handleChange}
            errors={errors}
            hasError={isSubmitted && !!errors.dateEnd}
          />
        </div>
      </div>
      <Button className="mt-4 w-fit rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/75">
        Submit
      </Button>
    </form>
  );
}

export default EditEducation;
