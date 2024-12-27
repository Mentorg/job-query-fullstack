type SelectProps<T, K extends keyof T> = {
  name: K;
  value: T[K];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errors: Partial<{ [P in K]: boolean | string | number }>;
  hasError?: boolean;
  children: React.ReactNode;
};

function Select<T, K extends keyof T>({
  name,
  value,
  onChange,
  errors,
  hasError,
  children,
}: SelectProps<T, K>) {
  return (
    <>
      <select
        name={name as string}
        id={name as string}
        value={value as string}
        onChange={onChange}
        className={`rounded-md border-2 px-5 py-2 ${
          hasError ? "border-red-500" : "border-slate-200"
        }`}
      >
        {children}
      </select>
      {hasError && errors[name] && (
        <p className="mt-2 text-sm font-medium text-red-600">{errors[name]}</p>
      )}
    </>
  );
}

export default Select;
