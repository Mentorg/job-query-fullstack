import { useTranslation } from "react-i18next";
import Label from "../../../../shared/components/form/Label";
import TextArea from "../../../../shared/components/form/TextArea";
import Button from "../../../../shared/components/ui/Button";
import { DetailedApplication } from "../../../../shared/types/application";
import { useUpdateApplicationNote } from "../hooks/useUpdateApplicationNote";

type ApplicationNoteFormProps = {
  application: DetailedApplication;
  onCloseModal: () => void;
};

function ApplicationNoteForm({
  application,
  onCloseModal,
}: ApplicationNoteFormProps) {
  const { form, errors, handleChange, handleSubmit } =
    useUpdateApplicationNote(application);
  const { t } = useTranslation();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    handleSubmit(e);
    onCloseModal();
  }

  return (
    <form
      onSubmit={submit}
      className="sm:w-[10 0dvw] w-full md:w-full sm:landscape:w-full"
    >
      <div className="my-8 flex flex-col">
        <Label htmlFor="note">{t("label.description")}</Label>
        <TextArea
          name="note"
          value={form.note}
          onChange={handleChange}
          errors={errors}
          hasError={!!errors.note}
        />
      </div>
      <div>
        <Button className="mt-4 rounded-md bg-primary px-6 py-2 text-sm text-white">
          {t("button.updateNote")}
        </Button>
      </div>
    </form>
  );
}

export default ApplicationNoteForm;
