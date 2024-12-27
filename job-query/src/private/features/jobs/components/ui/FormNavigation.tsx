import { MdOutlineArrowBackIos } from "react-icons/md";
import Button from "../../../../../shared/components/ui/Button";
import { JobErrors } from "../../../../../shared/types/job";

type FormNavigationProps = {
  step: number;
  setStep: (step: number) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function FormNavigation({ step, setStep, onSubmit }: FormNavigationProps) {
  const errors: JobErrors = {
    title: false,
    isFulltime: false,
    workPreference: false,
    seniority: false,
    experience: false,
    salaryFrom: false,
    salaryTo: false,
    isSalaryMonthly: false,
    hasVisaSponsorship: false,
    education: false,
    locations: false,
    positionOverview: false,
    qualifications: false,
    responsibilities: false,
  };

  let buttonContent = "";

  if (step === 1) buttonContent = "Continue";
  if (step === 2) buttonContent = "Next";
  if (step === 3) buttonContent = "Next";
  if (step === 4) buttonContent = "Publish Now";

  const nextStep = () => step < 4 && setStep(step + 1);
  const previousStep = () => step > 1 && setStep(step - 1);

  return (
    <div className="mt-10 flex items-center justify-between">
      <div>
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
      <div className="flex items-center gap-x-5">
        <p className="text-xs text-slate-400 sm:text-base">
          {step} out of 4 Steps
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            onClick={step < 4 ? nextStep : onSubmit}
            hasError={Object.keys(errors).filter(
              (field) => errors[field as keyof JobErrors],
            )}
            className="rounded-md border border-primary bg-primary px-8 py-2 text-xs text-white md:text-base"
          >
            {buttonContent}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormNavigation;
