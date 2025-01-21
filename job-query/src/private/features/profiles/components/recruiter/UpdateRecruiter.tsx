import { useTranslation } from "react-i18next";
import Label from "../../../../../shared/components/form/Label";
import TextArea from "../../../../../shared/components/form/TextArea";
import Button from "../../../../../shared/components/ui/Button";
import { useUpdateRecruiter } from "../../hooks/useUpdateRecruiter";
import { Recruiter } from "../../../../../shared/types/user";

type UpdateRecruiterProps = {
  recruiter: Recruiter;
  onCloseModal: () => void;
};

function UpdateRecruiter({ recruiter, onCloseModal }: UpdateRecruiterProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateRecruiter(recruiter);
  const { t } = useTranslation();

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
        <Label htmlFor="expertise">{t("recruiter.expertise")}</Label>
        <TextArea
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.expertise}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="description">{t("recruiter.description")}</Label>
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
          {t("button.confirm")}
        </Button>
      </div>
    </form>
  );
}

export default UpdateRecruiter;
