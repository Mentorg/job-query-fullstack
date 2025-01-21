import { useTranslation } from "react-i18next";

type SortAnalyticsProps = {
  period: string;
  onHandleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SortAnalytics({ period, onHandleChange }: SortAnalyticsProps) {
  const { t } = useTranslation();

  return (
    <div>
      <select
        value={period}
        onChange={onHandleChange}
        className={`rounded-md border-2 px-5 py-2`}
      >
        <option value="weekly" key="weekly">
          {t("filter.currentWeek")}
        </option>
        <option value="monthly" key="monthly">
          {t("filter.currentMonth")}
        </option>
        <option value="annual" key="annual">
          {t("filter.currentYear")}
        </option>
      </select>
    </div>
  );
}

export default SortAnalytics;
