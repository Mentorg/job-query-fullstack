import { useTranslation } from "react-i18next";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Button from "../../../../../shared/components/ui/Button";
import { JobErrors } from "../../../../../shared/types/job";

type FormNavigationProps = {
  step: number;
  setStep: (step: number) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function FormNavigation({ step, setStep, onSubmit }: FormNavigationProps) {
  const { t } = useTranslation();

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

  if (step === 1) buttonContent = "continue";
  if (step === 2) buttonContent = "next";
  if (step === 3) buttonContent = "next";
  if (step === 4) buttonContent = "publish";

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
            {t("button.previous")}
          </Button>
        )}
      </div>
      <div className="flex items-center gap-x-5">
        <p className="text-xs text-slate-400 sm:text-base">
          {t("job.jobFormStep", { count: step })}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            onClick={step < 4 ? nextStep : onSubmit}
            hasError={Object.keys(errors).filter(
              (field) => errors[field as keyof JobErrors],
            )}
            className="rounded-md border border-primary bg-primary px-8 py-2 text-xs text-white md:text-base"
          >
            {t(`button.${buttonContent}`)}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormNavigation;
