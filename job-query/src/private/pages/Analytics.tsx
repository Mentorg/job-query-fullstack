import SortAnalytics from "../features/analytics/components/SortAnalytics";
import AnalyticsContainer from "../features/analytics/components/AnalyticsContainer";
import { useSelectPeriod } from "../hooks/useSelectPeriod";

function Analytics() {
  const { period, handleChange } = useSelectPeriod();

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-2xl">
          Analytics
        </h1>
        <SortAnalytics period={period} onHandleChange={handleChange} />
      </div>
      <AnalyticsContainer period={period} />
    </div>
  );
}

export default Analytics;
