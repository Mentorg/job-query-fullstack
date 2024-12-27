export type Education = {
  id: number;
  department: string;
  degree: string;
  university: string;
  honors: string;
  gpa: string;
  dateStart: string;
  dateEnd: string;
  applicantId: number;
};

export type CreateEducation = {
  department: string;
  degree: string;
  university: string;
  honors: string;
  gpa: string;
  dateStart: string;
  dateEnd: string;
};

export type EducationErrors = {
  department: boolean | string;
  degree: boolean | string;
  university: boolean | string;
  honors: boolean | string;
  gpa: boolean | string;
  dateStart: boolean | string;
  dateEnd: boolean | string;
};
