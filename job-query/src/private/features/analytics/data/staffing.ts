export type Period = {
  name: string;
  active: number;
  filled: number;
};

const weekly: Period[] = [
  {
    name: "Mon",
    active: 10,
    filled: 5,
  },
  {
    name: "Tue",
    active: 12,
    filled: 7,
  },
  {
    name: "Wed",
    active: 15,
    filled: 9,
  },
  {
    name: "Thu",
    active: 14,
    filled: 8,
  },
  {
    name: "Fri",
    active: 12,
    filled: 7,
  },
  {
    name: "Sat",
    active: 15,
    filled: 9,
  },
  {
    name: "Sun",
    active: 10,
    filled: 5,
  },
];

const monthly: Period[] = [
  {
    name: "Week 1",
    active: 500,
    filled: 300,
  },
  {
    name: "Week 2",
    active: 600,
    filled: 350,
  },
  {
    name: "Week 3",
    active: 650,
    filled: 400,
  },
  {
    name: "Week 4",
    active: 650,
    filled: 400,
  },
];

const annual: Period[] = [
  {
    name: "Jan",
    active: 50,
    filled: 30,
  },
  {
    name: "Feb",
    active: 60,
    filled: 35,
  },
  {
    name: "Mar",
    active: 65,
    filled: 40,
  },
  {
    name: "Apr",
    active: 70,
    filled: 45,
  },
  {
    name: "May",
    active: 75,
    filled: 50,
  },
  {
    name: "Jun",
    active: 80,
    filled: 55,
  },
  {
    name: "Jul",
    active: 65,
    filled: 40,
  },
  {
    name: "Aug",
    active: 70,
    filled: 45,
  },
  {
    name: "Sep",
    active: 75,
    filled: 50,
  },
  {
    name: "Oct",
    active: 65,
    filled: 40,
  },
  {
    name: "Nov",
    active: 70,
    filled: 45,
  },
  {
    name: "Dec",
    active: 75,
    filled: 50,
  },
];

export { weekly, monthly, annual };
