import { useTranslation } from "react-i18next";
import Label from "../../../../../shared/components/form/Label";
import TextArea from "../../../../../shared/components/form/TextArea";
import {
  CreateJob,
  UpdateJob,
  JobErrors,
} from "../../../../../shared/types/job";

type JobDescriptionProps = {
  form: CreateJob | UpdateJob;
  errors: JobErrors;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
};

function JobDescription({ form, errors, handleChange }: JobDescriptionProps) {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="border-b-2 border-slate-300 py-4 text-2xl font-semibold xl:text-2xl">
        {t("job.jobDescription")}
      </h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="my-8">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="positionOverview">{t("label.jobBrief")}</Label>
            <TextArea
              name="positionOverview"
              value={form.positionOverview}
              onChange={handleChange}
              errors={errors}
              hasError={!!errors.positionOverview}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDescription;
