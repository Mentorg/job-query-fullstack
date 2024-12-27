import { Competency } from "../../types/job";

type TextFieldProps<T> = {
  name: string; // Keep as string for dynamic names
  type: string;
  value: string | number | undefined | Competency;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Partial<Record<keyof T, boolean | string | number>>; // Use mapped type based on the form
  hasError: boolean;
};

function TextField<T>({
  name,
  type,
  value,
  onChange,
  errors,
  hasError,
}: TextFieldProps<T>) {
  const valueToDisplay =
    typeof value === "object" && value !== null
      ? (value as Competency).description
      : value;

  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        value={valueToDisplay || ""}
        onChange={onChange}
        className={`rounded-md border-2 px-5 py-2 ${
          hasError ? "border-red-500" : "border-slate-200"
        }`}
      />
      {hasError && errors[name as keyof T] && (
        <p className="mt-2 text-sm font-medium text-red-600">
          {errors[name as keyof T]}
        </p>
      )}
    </>
  );
}

export default TextField;
