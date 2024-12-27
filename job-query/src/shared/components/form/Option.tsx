type OptionProps = {
  value: string | number;
  children: React.ReactNode;
};

function Option({ value, children }: OptionProps) {
  return (
    <option value={value} key={value}>
      {children}
    </option>
  );
}

export default Option;
