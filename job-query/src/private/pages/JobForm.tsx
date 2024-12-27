import { useState } from "react";
import BasicInformation from "../features/jobs/components/form/BasicInformation";
import FormNavigation from "../features/jobs/components/ui/FormNavigation";
import JobDescription from "../features/jobs/components/form/JobDescription";
import Confirmation from "../features/jobs/components/ui/Confirmation";
import Competencies from "../features/jobs/components/form/Competencies";
import { useCreateJob } from "../features/jobs/hooks/useCreateJob";
import Loading from "../../shared/components/ui/Loading";

function JobForm() {
  const {
    form,
    errors,
    addResponsibility,
    addQualification,
    handleResponsibilityChange,
    handleQualificationChange,
    handleChange,
    handleSubmit,
    isPending,
    error,
  } = useCreateJob();

  const [step, setStep] = useState(1);

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
            isCreate={true}
            addResponsibility={addResponsibility}
            addQualification={addQualification}
            handleResponsibilityChange={handleResponsibilityChange}
            handleQualificationChange={handleQualificationChange}
          />
        );
      case 4:
        return <Confirmation form={form} />;
    }
  }

  return (
    <div className="flex w-full flex-col px-6 py-4 md:px-14">
      <form onSubmit={handleSubmit} className="w-full 2xl:w-[80dvw]">
        {renderForm()}
        {isPending && <Loading />}
        {error && <p className="text-red-500">{error.message}</p>}
      </form>
      <FormNavigation step={step} setStep={setStep} onSubmit={handleSubmit} />
    </div>
  );
}

export default JobForm;
