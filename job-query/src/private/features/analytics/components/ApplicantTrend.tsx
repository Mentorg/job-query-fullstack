import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Period } from "../data/applicantTrend";

type ApplicantTrendProps = {
  data: Period[];
};

function ApplicantTrend({ data }: ApplicantTrendProps) {
  const { t } = useTranslation();
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="vacancies"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name={t("analytics.vacancies")}
        />
        <Line
          type="monotone"
          dataKey="applicants"
          stroke="#82ca9d"
          name={t("analytics.applicants")}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ApplicantTrend;
