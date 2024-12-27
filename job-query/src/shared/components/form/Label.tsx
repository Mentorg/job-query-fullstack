type LabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
};

function Label({ htmlFor, children }: LabelProps) {
  return <label htmlFor={htmlFor}>{children}</label>;
}

export default Label;
