import { useTranslation } from "react-i18next";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 75 },
  { name: "Group B", value: 25 },
];

function ProfileCompletionMetric() {
  const { t } = useTranslation();

  return (
    <div className="grid w-full grid-cols-1 grid-rows-[2fr_1fr] items-center gap-4 rounded-md bg-slate-100 p-6 2xl:grid-cols-[1fr_2fr] 2xl:grid-rows-1 2xl:p-10">
      <ResponsiveContainer width="100%" height={100}>
        <PieChart
          margin={{
            top: 25,
            right: 30,
            left: 20,
            bottom: 25,
          }}
          className="h-full w-full md:h-full md:w-full"
        >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            dataKey="value"
            innerRadius={"160%"}
            outerRadius={"200%"}
            startAngle={450}
            endAngle={90}
          >
            {data.map((_, index) => {
              if (index === 1) {
                return <Cell key={`cell-${index}`} fill="#d3d3d3" />;
              }
              return <Cell key={`cell-${index}`} fill="#CE2079" />;
            })}
            <Label
              value={`${data[0].value}%`}
              position="center"
              className="fill-primary text-lg font-semibold md:text-xl lg:text-2xl"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="">
        <h2 className="text-center text-xl font-semibold xl:text-left">
          {t("user.profileCompletion")}
        </h2>
      </div>
    </div>
  );
}

export default ProfileCompletionMetric;
