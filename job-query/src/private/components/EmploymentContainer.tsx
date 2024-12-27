type EmploymentContainerProps = {
  title: string;
  children: React.ReactNode;
};

function EmploymentContainer({ title, children }: EmploymentContainerProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-y-4 sm:flex-row sm:items-center sm:gap-y-0">
      <h1 className="text-2xl font-semibold md:mt-4 2xl:text-2xl">{title}</h1>
      <div className="flex gap-4">{children}</div>
    </div>
  );
}

export default EmploymentContainer;
