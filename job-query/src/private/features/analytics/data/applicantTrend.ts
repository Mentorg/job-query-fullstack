export type Period = {
  name: string;
  applicants: number;
  vacancies: number;
};

const weekly: Period[] = [
  {
    name: "Mon",
    applicants: 10,
    vacancies: 5,
  },
  {
    name: "Tue",
    applicants: 15,
    vacancies: 6,
  },
  {
    name: "Wed",
    applicants: 18,
    vacancies: 7,
  },
  {
    name: "Thu",
    applicants: 12,
    vacancies: 4,
  },
  {
    name: "Fri",
    applicants: 20,
    vacancies: 8,
  },
  {
    name: "Sat",
    applicants: 25,
    vacancies: 10,
  },
  {
    name: "Sun",
    applicants: 22,
    vacancies: 9,
  },
];

const monthly: Period[] = [
  {
    name: "Week 1",
    applicants: 75,
    vacancies: 30,
  },
  {
    name: "Week 2",
    applicants: 90,
    vacancies: 36,
  },
  {
    name: "Week 3",
    applicants: 80,
    vacancies: 32,
  },
  {
    name: "Week 4",
    applicants: 100,
    vacancies: 40,
  },
];

const annual: Period[] = [
  {
    name: "Jan",
    applicants: 250,
    vacancies: 100,
  },
  {
    name: "Feb",
    applicants: 280,
    vacancies: 112,
  },
  {
    name: "Mar",
    applicants: 320,
    vacancies: 128,
  },
  {
    name: "Apr",
    applicants: 300,
    vacancies: 120,
  },
  {
    name: "May",
    applicants: 350,
    vacancies: 140,
  },
  {
    name: "Jun",
    applicants: 380,
    vacancies: 152,
  },
  {
    name: "Jul",
    applicants: 400,
    vacancies: 160,
  },
  {
    name: "Aug",
    applicants: 430,
    vacancies: 172,
  },
  {
    name: "Sep",
    applicants: 450,
    vacancies: 180,
  },
  {
    name: "Oct",
    applicants: 480,
    vacancies: 192,
  },
  {
    name: "Nov",
    applicants: 520,
    vacancies: 208,
  },
  {
    name: "Dec",
    applicants: 550,
    vacancies: 220,
  },
];

export { weekly, monthly, annual };
