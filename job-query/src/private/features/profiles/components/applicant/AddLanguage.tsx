import Button from "../../../../../shared/components/ui/Button";
import Loading from "../../../../../shared/components/ui/Loading";
import { Ability } from "../../../../../shared/types/ability";
import { useGetLanguages } from "../../hooks/useGetLanguages";
import { useUpdateLanguages } from "../../hooks/useUpdateLanguages";

type AddLanguageProps = {
  resource: Ability[];
  onCloseModal: () => void;
};

function AddLanguage({ resource, onCloseModal }: AddLanguageProps) {
  const { languages, isPending, error } = useGetLanguages();
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateLanguages(resource);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (isSubmitted && !Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit}>
      <p className="font-semibold">Select your languages</p>
      <div className="mt-4 grid grid-cols-2 gap-y-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {languages.map((record: Ability) => (
          <div key={record.id} className="flex items-center">
            <input
              type="checkbox"
              name="languages"
              id={`language-${record.id}`}
              checked={form.languages.includes(record.id)}
              value={record.id}
              onChange={handleChange}
            />
            <label
              htmlFor={`language-${record.id}`}
              className="ml-2 text-xs font-semibold"
            >
              {record.description}
            </label>
          </div>
        ))}
      </div>
      <Button className="mt-4 w-fit rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/75">
        Submit
      </Button>
    </form>
  );
}

export default AddLanguage;
