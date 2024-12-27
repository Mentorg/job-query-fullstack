import { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import BasicInformation from "./BasicInformation";
import JobDescription from "./JobDescription";
import Competencies from "./Competencies";
import Button from "../../../../../shared/components/ui/Button";
import { useUpdateJob } from "../../hooks/useUpdateJob";
import { UpdateJob } from "../../../../../shared/types/job";

type JobEditProps = {
  job: UpdateJob;
  onCloseModal: () => void;
};

function JobEdit({ job, onCloseModal }: JobEditProps) {
  const {
    form,
    errors,
    addResponsibility,
    addQualification,
    removeResponsibility,
    removeQualification,
    handleResponsibilityChange,
    handleQualificationChange,
    handleChange,
    handleSubmit,
  } = useUpdateJob(job);
  const [step, setStep] = useState(1);

  function submit(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) {
    handleSubmit(e);
    onCloseModal();
  }

  function previousStep(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    step > 1 && setStep(step - 1);
  }

  function nextStep(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    step < 3 && setStep(step + 1);
  }

  function renderForm() {
    switch (step) {
      case 1:
        return (
          <BasicInformation
            form={form}
            errors={errors}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <JobDescription
            form={form}
            errors={errors}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <Competencies
            form={form}
            errors={errors}
            isCreate={false}
            addResponsibility={addResponsibility}
            addQualification={addQualification}
            removeQualification={removeQualification}
            removeResponsibility={removeResponsibility}
            handleResponsibilityChange={handleResponsibilityChange}
            handleQualificationChange={handleQualificationChange}
          />
        );
    }
  }

  return (
    <form onSubmit={submit}>
      <h2 className="border-b-2 border-slate-300 py-4 text-2xl font-medium">
        Edit: {job.title}
      </h2>
      <div className="mt-2 flex items-stretch gap-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            setStep(1);
          }}
          className={`${step === 1 ? "bg-green-400 text-white" : "bg-slate-200"} w-full rounded-md px-3 py-1 transition-all hover:bg-green-400 hover:text-white focus:bg-green-400 focus:text-white`}
        >
          Basic Information
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          className={`${step === 2 ? "bg-green-400 text-white" : "bg-slate-200"} w-full rounded-md px-3 py-1 transition-all hover:bg-green-400 hover:text-white focus:bg-green-400 focus:text-white`}
        >
          Job Description
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setStep(3);
          }}
          className={`${step === 3 ? "bg-green-400 text-white" : "bg-slate-200"} w-full rounded-md px-3 py-1 transition-all hover:bg-green-400 hover:text-white focus:bg-green-400 focus:text-white`}
        >
          Competencies
        </Button>
      </div>
      {renderForm()}
      <div className="flex justify-between">
        <div className="my-8 flex justify-end gap-4">
          {step > 1 && (
            <Button
              onClick={previousStep}
              className="flex items-center text-lg font-medium text-slate-400"
            >
              <span className="mr-2">
                <MdOutlineArrowBackIos className="h-[15px] w-[15px]" />
              </span>
              Previous
            </Button>
          )}
        </div>
        <div className="my-8 flex justify-end gap-4">
          <Button
            onClick={submit}
            className="rounded-md border border-primary bg-primary px-8 py-2 text-xs text-white transition-all hover:bg-primary/75 md:text-base"
          >
            Submit
          </Button>

          {step !== 4 && (
            <Button
              onClick={nextStep}
              className="rounded-md border border-green-400 bg-green-400 px-8 py-2 text-xs text-white transition-all hover:bg-green-400/75 md:text-base"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

export default JobEdit;
