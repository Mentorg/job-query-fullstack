import { useTranslation } from "react-i18next";
import Label from "../../shared/components/form/Label";
import Select from "../../shared/components/form/Select";
import Option from "../../shared/components/form/Option";
import Button from "../../shared/components/ui/Button";
import { useUpdateLocaleSettings } from "../features/settings/hooks/useUpdateLocaleSettings";
import { User } from "../../shared/types/user";

type UpdateLanguageProps = {
  resource: Partial<User> | null;
  onCloseModal: () => void;
};

function UpdateLanguage({ resource, onCloseModal }: UpdateLanguageProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateLocaleSettings(resource);
  const { t } = useTranslation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  const languageMap: Record<string, string> = {
    "en-US": "English",
    de: "German",
    fr: "French",
  };

  return (
    <form onSubmit={submit}>
      <div className="flex w-full flex-col gap-y-2">
        <Label htmlFor="language">{t("label.language")}</Label>
        <Select
          name="language"
          value={form.language}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.language}
        >
          {["en-US", "de", "fr"].map((languageCode) => (
            <Option value={languageCode} key={languageCode}>
              {languageMap[languageCode]}
            </Option>
          ))}
        </Select>
      </div>
      <Button className="mt-4 rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/70">
        {t("button.submit")}
      </Button>
    </form>
  );
}

export default UpdateLanguage;
