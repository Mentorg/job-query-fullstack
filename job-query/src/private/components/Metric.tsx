import { useTranslation } from "react-i18next";
import { MdOutlineTrendingUp, MdTrendingDown } from "react-icons/md";
import { LineChart, Line, ResponsiveContainer } from "recharts";

type MetricProps = {
  title: string;
  currentValue: string;
  previousValue: string;
  time: string;
};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

function Metric({ title, currentValue, previousValue, time }: MetricProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full rounded-md bg-slate-100 p-6 2xl:p-10">
      <div>
        <h2 className="text-center font-semibold xl:text-left">{title}</h2>
      </div>
      <div className="flex flex-col 2xl:flex-row">
        <div className="mt-10 flex flex-col items-center xl:items-baseline">
          <h3 className="text-4xl font-semibold text-primary">
            {currentValue}
          </h3>
          <p className="ml-2 flex whitespace-nowrap text-sm font-medium">
            {currentValue > previousValue ? (
              <>
                <span className="mr-2 flex items-center text-green-600">
                  <MdOutlineTrendingUp />
                  {previousValue}
                </span>{" "}
                {t(`overview.last${time}`)}
              </>
            ) : (
              <>
                <span className="mr-2 flex items-center text-red-600">
                  <MdTrendingDown />
                  {previousValue}
                </span>{" "}
                {t(`overview.last${time}`)}
              </>
            )}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 25,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="pv"
              dot={false}
              activeDot={{ r: 8 }}
              stroke="red"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="uv"
              dot={false}
              stroke="green"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Metric;
