import { FaRegTrashAlt } from "react-icons/fa";
import Label from "../../../../../shared/components/form/Label";
import TextField from "../../../../../shared/components/form/TextField";
import Button from "../../../../../shared/components/ui/Button";
import {
  UpdateJob,
  Competency,
  JobErrors,
  CreateJob,
} from "../../../../../shared/types/job";

type JobDescriptionProps = {
  form: CreateJob | UpdateJob;
  errors: JobErrors;
  isCreate: boolean;
  addResponsibility: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addQualification: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeResponsibility?: (index: number) => void;
  removeQualification?: (index: number) => void;
  handleResponsibilityChange: (index: number, value: string) => void;
  handleQualificationChange: (index: number, value: string) => void;
};

function isCompetency(
  item: string | Competency | { description: string | Competency },
): item is Competency {
  return (item as Competency).id !== undefined;
}

function Competencies({
  form,
  errors,
  isCreate,
  addResponsibility,
  addQualification,
  removeResponsibility,
  removeQualification,
  handleResponsibilityChange,
  handleQualificationChange,
}: JobDescriptionProps) {
  const responsibilities = isCreate
    ? form.responsibilities.map((responsibility) => ({
        description: responsibility,
      }))
    : form.responsibilities;

  const qualifications = isCreate
    ? form.qualifications.map((qualification) => ({
        description: qualification,
      }))
    : form.qualifications;

  return (
    <>
      <h1 className="border-b-2 border-slate-300 py-4 text-2xl font-semibold xl:text-2xl">
        Job Responsibilities & Qualifications
      </h1>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="my-8">
          {responsibilities.map((responsibility, index) => {
            const isCompetencyItem = isCompetency(responsibility); // Check if it's a Competency
            return (
              <div
                key={isCompetencyItem ? responsibility.id : index}
                className="flex gap-4"
              >
                <div className="my-4 flex w-full flex-col gap-y-1">
                  <Label htmlFor={`responsibility-${index}`}>
                    Responsibility #{index + 1}
                  </Label>
                  <TextField
                    name={`responsibility[${index}]`}
                    type="text"
                    value={
                      isCreate
                        ? typeof responsibility === "string"
                          ? responsibility // if it's a string, pass it directly
                          : responsibility.description
                            ? responsibility.description
                            : "" // if it's not a string, extract description
                        : typeof responsibility === "string"
                          ? responsibility // if it's a string, pass it directly
                          : responsibility.description
                            ? responsibility.description
                            : "" // if it's not a string, extract description
                    }
                    onChange={(e) =>
                      handleResponsibilityChange(index, e.target.value)
                    }
                    errors={errors}
                    hasError={!!errors.responsibilities}
                  />
                </div>
                {!isCreate &&
                  responsibilities.length > 1 &&
                  removeResponsibility && (
                    <div className="flex items-center">
                      <Button
                        onClick={() => removeResponsibility(index)}
                        className="rounded-full p-4 transition-all hover:bg-slate-100"
                      >
                        <FaRegTrashAlt className="text-red-700 transition-all" />
                      </Button>
                    </div>
                  )}
              </div>
            );
          })}
          <Button
            onClick={(e) => addResponsibility(e)}
            className="rounded-md bg-slate-200 px-4 py-2 font-medium text-slate-500 transition-all hover:bg-slate-100"
          >
            Add Responsibility
          </Button>
        </div>
        <div className="my-8">
          {qualifications.map((qualification, index) => {
            const isCompetencyItem = isCompetency(qualification); // Check if it's a Competency
            return (
              <div
                key={isCompetencyItem ? qualification.id : index}
                className="flex gap-4"
              >
                <div className="my-4 flex w-full flex-col gap-y-1">
                  <Label htmlFor={`qualification-${index}`}>
                    Qualification #{index + 1}
                  </Label>
                  <TextField
                    name={`qualification[${index}]`}
                    type="text"
                    value={
                      isCreate
                        ? typeof qualification === "string"
                          ? qualification // if it's a string, pass it directly
                          : qualification.description
                            ? qualification.description
                            : "" // if it's not a string, extract description
                        : typeof qualification === "string"
                          ? qualification // if it's a string, pass it directly
                          : qualification.description
                            ? qualification.description
                            : "" // if it's not a string, extract description
                    }
                    onChange={(e) =>
                      handleQualificationChange(index, e.target.value)
                    }
                    errors={errors}
                    hasError={!!errors.qualifications}
                  />
                </div>
                {!isCreate &&
                  qualifications.length > 1 &&
                  removeQualification && (
                    <div className="flex items-center">
                      <Button
                        onClick={() => removeQualification(index)}
                        className="rounded-full p-4 transition-all hover:bg-slate-100"
                      >
                        <FaRegTrashAlt className="text-red-700 transition-all" />
                      </Button>
                    </div>
                  )}
              </div>
            );
          })}
          <Button
            onClick={(e) => addQualification(e)}
            className="rounded-md bg-slate-200 px-4 py-2 font-medium text-slate-500 transition-all hover:bg-slate-100"
          >
            Add Qualification
          </Button>
        </div>
      </div>
    </>
  );
}

export default Competencies;
