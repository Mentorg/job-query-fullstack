type ChipProps = {
  icon: React.ReactNode;
  className: string;
  children: React.ReactNode;
};

function Chip({ icon, className, children }: ChipProps) {
  return (
    <span className={className}>
      {icon}
      <p className="ml-1 text-xs font-normal text-white">{children}</p>
    </span>
  );
}

export default Chip;
