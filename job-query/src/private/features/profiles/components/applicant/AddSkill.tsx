import { useTranslation } from "react-i18next";
import Button from "../../../../../shared/components/ui/Button";
import Loading from "../../../../../shared/components/ui/Loading";
import { useGetSkills } from "../../hooks/useGetSkills";
import { useUpdateSkills } from "../../hooks/useUpdateSkills";
import { Ability } from "../../../../../shared/types/ability";

type AddSkillProps = {
  resource: Ability[];
  onCloseModal: () => void;
};

function AddSkill({ resource, onCloseModal }: AddSkillProps) {
  const { skills, isPending, error } = useGetSkills();
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateSkills(resource);
  const { t } = useTranslation();

  if (isPending) {
    return <Loading />;
  }

  if (error) return <div>{t("system.serverError")}</div>;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (isSubmitted && !Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit}>
      <p className="font-semibold">{t("modal.selectSkills")}</p>
      <div className="mt-4 grid grid-cols-2 gap-y-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {skills.map((record: Ability) => (
          <div key={record.id} className="flex items-center">
            <input
              type="checkbox"
              name="skills"
              id={`skill-${record.id}`}
              checked={form.skills.includes(record.id)}
              value={record.id}
              onChange={handleChange}
            />
            <label
              htmlFor={`skill-${record.id}`}
              className="ml-2 text-xs font-semibold"
            >
              {record.description}
            </label>
          </div>
        ))}
      </div>
      <Button className="mt-4 w-fit rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/75">
        {t("button.submit")}
      </Button>
    </form>
  );
}

export default AddSkill;
