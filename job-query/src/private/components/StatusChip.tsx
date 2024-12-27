type StatusChipProps = {
  children: React.ReactNode;
};

function StatusChip({ children }: StatusChipProps) {
  let color = "";
  color =
    children === "hired" || children === "filled"
      ? "border-green-500"
      : children === "interview" || children === "open"
        ? "border-blue-500"
        : children === "on-hold"
          ? "border-yellow-500"
          : children === "shortlisted"
            ? "border-orange-500"
            : children === "rejected" || children === "expired"
              ? "border-red-500"
              : children === "received"
                ? "border-purple-500"
                : "";

  return (
    <p
      className={`${color} h-fit w-fit whitespace-nowrap rounded-full border-2 px-3 py-1 text-sm capitalize`}
    >
      {children}
    </p>
  );
}

export default StatusChip;
