import { useTranslation } from "react-i18next";
import ApplicantTrend from "./ApplicantTrend";
import Staffing from "./Staffing";
import {
  weekly as weeklyTrend,
  monthly as monthlyTrend,
  annual as annualTrend,
} from "../data/applicantTrend";
import {
  weekly as weeklyStaff,
  monthly as monthlyStaff,
  annual as annualStaff,
} from "../data/staffing";

type AnalyticsContainerProps = {
  period: string;
};

function AnalyticsContainer({ period }: AnalyticsContainerProps) {
  const { t } = useTranslation();

  const translatedWeeklyTrend = weeklyTrend.map((entry) => ({
    ...entry,
    name: t(`weekDay.${entry.name.toLowerCase()}`),
  }));

  const translatedMonthlyTrend = monthlyTrend.map((entry) => {
    const weekMatch = entry.name.match(/^Week (\d+)$/);
    return {
      ...entry,
      name: weekMatch
        ? t("week", { count: parseInt(weekMatch[1], 10) })
        : entry.name,
    };
  });

  const translatedAnnualTrend = annualTrend.map((entry) => ({
    ...entry,
    name: t(`yearMonths.${entry.name.toLowerCase()}`),
  }));

  const translatedWeeklyStaff = weeklyStaff.map((entry) => ({
    ...entry,
    name: t(`weekDay.${entry.name.toLowerCase()}`),
  }));

  const translatedMonthlyStaff = monthlyStaff.map((entry) => {
    const weekMatch = entry.name.match(/^Week (\d+)$/);
    return {
      ...entry,
      name: weekMatch
        ? t("week", { count: parseInt(weekMatch[1], 10) })
        : entry.name,
    };
  });

  const translatedAnnualStaff = annualStaff.map((entry) => ({
    ...entry,
    name: t(`yearMonths.${entry.name.toLowerCase()}`),
  }));

  return (
    <div className="flex flex-col gap-5 2xl:flex-row">
      <div className="h-full w-full rounded-md bg-slate-100 p-6">
        <h2 className="mb-4 font-semibold">
          {t("analytics.applicantVacancyTrend")}
        </h2>
        <ApplicantTrend
          data={
            period === "weekly"
              ? translatedWeeklyTrend
              : period === "monthly"
                ? translatedMonthlyTrend
                : translatedAnnualTrend
          }
        />
      </div>
      <div className="h-full w-full rounded-md bg-slate-100 p-6">
        <h2 className="mb-4 font-semibold">{t("analytics.vacancyStatus")}</h2>
        <Staffing
          data={
            period === "weekly"
              ? translatedWeeklyStaff
              : period === "monthly"
                ? translatedMonthlyStaff
                : translatedAnnualStaff
          }
        />
      </div>
    </div>
  );
}

export default AnalyticsContainer;
