import { useTranslation } from "react-i18next";

type StatusChipProps = {
  children: React.ReactNode;
};

const statusColors: Record<string, string> = {
  hired: "border-green-500",
  filled: "border-green-500",
  applicant: "border-green-500",
  interview: "border-blue-500",
  open: "border-blue-500",
  recruiter: "border-blue-500",
  "on-hold": "border-yellow-500",
  shortlisted: "border-orange-500",
  rejected: "border-red-500",
  expired: "border-red-500",
  admin: "border-red-500",
  received: "border-purple-500",
};

const statusTranslations: Record<string, string> = {
  hired: "application.status.hired",
  interview: "application.status.interview",
  "on-hold": "application.status.onHold",
  shortlisted: "application.status.shortlisted",
  rejected: "application.status.rejected",
  received: "application.status.received",
  filled: "job.statusFilled",
  open: "job.statusOpen",
  expired: "job.statusExpired",
};

function StatusChip({ children }: StatusChipProps) {
  const { t } = useTranslation();

  const color = statusColors[children as string] || "";
  const statusTranslationKey = statusTranslations[children as string] || "";

  return (
    <p
      className={`${color} h-fit w-fit whitespace-nowrap rounded-full border-2 px-3 py-1 text-sm capitalize`}
    >
      {statusTranslationKey ? t(statusTranslationKey) : children}
    </p>
  );
}

export default StatusChip;
