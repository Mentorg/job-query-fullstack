type SortAnalyticsProps = {
  period: string;
  onHandleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SortAnalytics({ period, onHandleChange }: SortAnalyticsProps) {
  return (
    <div>
      <select
        value={period}
        onChange={onHandleChange}
        className={`rounded-md border-2 px-5 py-2`}
      >
        <option value="weekly" key="weekly">
          This week
        </option>
        <option value="monthly" key="monthly">
          This Month
        </option>
        <option value="annual" key="annual">
          This Year
        </option>
      </select>
    </div>
  );
}

export default SortAnalytics;
