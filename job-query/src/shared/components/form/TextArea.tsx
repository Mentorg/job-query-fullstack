type TextAreaProps<T, K extends keyof T> = {
  name: K;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors: Partial<{ [P in K]: boolean | string | null }>;
  hasError: boolean;
};

function TextArea<T, K extends keyof T>({
  name,
  value,
  onChange,
  errors,
  hasError,
}: TextAreaProps<T, K>) {
  return (
    <>
      <textarea
        cols={30}
        rows={10}
        name={name as string}
        id={name as string}
        value={value}
        onChange={onChange}
        className={`resize-none rounded-md border-2 px-5 py-2 ${hasError ? "border-red-500" : "border-slate-200"}`}
      ></textarea>
      {hasError && errors[name] && (
        <p className="mt-2 text-sm font-medium text-red-600">{errors[name]}</p>
      )}
    </>
  );
}

export default TextArea;
