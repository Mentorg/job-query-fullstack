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
  return (
    <div className="flex flex-col gap-5 2xl:flex-row">
      <div className="h-full w-full rounded-md bg-slate-100 p-6">
        <h2 className="mb-4 font-semibold">Applicant/Vacancy Trend</h2>
        <ApplicantTrend
          data={
            period === "weekly"
              ? weeklyTrend
              : period === "monthly"
                ? monthlyTrend
                : annualTrend
          }
        />
      </div>
      <div className="h-full w-full rounded-md bg-slate-100 p-6">
        <h2 className="mb-4 font-semibold">
          Active vacancies and filled vacancies
        </h2>
        <Staffing
          data={
            period === "weekly"
              ? weeklyStaff
              : period === "monthly"
                ? monthlyStaff
                : annualStaff
          }
        />
      </div>
    </div>
  );
}

export default AnalyticsContainer;
