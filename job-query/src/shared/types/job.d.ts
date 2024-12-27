import { Company } from "./company";
import { Location } from "./location";
import { Recruiter } from "./user";

export type Job = {
  id: number;
  title: string;
  isFulltime: boolean;
  workPreference: string;
  seniority: string;
  experience: number;
  salaryFrom: number;
  salaryTo: number;
  isSalaryMonthly: boolean;
  hasVisaSponsorship: boolean;
  education: string;
  status: string;
  applicants: number;
  slug: string;
  positionOverview: string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  locations: Location[] | number[];
  company: Company;
  recruiter: Recruiter;
  // qualifications: (Competency[] | string)[] | undefined;
  // responsibilities: (Competency | string)[] | undefined;
  qualifications: Competency[];
  responsibilities: Competency[];
};

export type Competency = {
  id: number;
  description: string;
  job_listings_id: number;
};

export type JobErrors = {
  title: boolean | string;
  isFulltime: boolean;
  workPreference: boolean | string;
  seniority: boolean | string;
  experience: boolean | number;
  salaryFrom: boolean | number;
  salaryTo: boolean | number;
  isSalaryMonthly: boolean;
  hasVisaSponsorship: boolean;
  education: boolean | string;
  positionOverview: boolean | string;
  locations: boolean | string;
  qualifications: boolean | string;
  responsibilities: boolean | string;
};

export type UpdateJob = {
  id: number;
  title: string;
  isFulltime: boolean;
  workPreference: string;
  seniority: string;
  experience: number;
  salaryFrom: number;
  salaryTo: number;
  isSalaryMonthly: boolean;
  hasVisaSponsorship: boolean;
  education: string;
  locations: Location[] | number[];
  positionOverview: string;
  qualifications: Competency[];
  responsibilities: Competency[];
};

export type CreateJob = {
  id?: number;
  title: string;
  isFulltime: boolean;
  workPreference: string;
  seniority: string;
  experience: number;
  salaryFrom: number;
  salaryTo: number;
  isSalaryMonthly: boolean;
  hasVisaSponsorship: boolean;
  education: string;
  locations: number[];
  positionOverview: string;
  qualifications: string[];
  responsibilities: string[];
};

export type JobApplicationPayload = {
  id: number;
  status: string;
};

// ========================
// Replace the types above with the ones below:
// Base properties shared by multiple job types
type JobBase = {
  title: string;
  isFulltime: boolean;
  workPreference: string;
  seniority: string;
  experience: number;
  salaryFrom: number;
  salaryTo: number;
  isSalaryMonthly: boolean;
  hasVisaSponsorship: boolean;
  education: string;
  positionOverview: string;
  locations: number[] | Location[];
  qualifications: string[] | Competency[];
  responsibilities: string[] | Competency[];
};

// Job type with additional properties
type Job = JobBase & {
  id: number;
  status: string;
  applicants: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  company: Company;
  recruiter: Recruiter;
};

// Type for updating a job, where `id` is mandatory but other properties remain similar to `JobBase`
type UpdateJob = JobBase & {
  id: number;
};

// Type for creating a job, where `id` is optional
type CreateJob = JobBase & {
  id?: number;
};

// Competency type remains the same, as it is quite self-contained
type Competency = {
  id: number;
  description: string;
  job_listings_id: number;
};

// Refactor JobErrors for reusability
type FieldError<T> = boolean | T;

type JobErrors = {
  title: FieldError<string>;
  isFulltime: FieldError<boolean>;
  workPreference: FieldError<string>;
  seniority: FieldError<string>;
  experience: FieldError<number>;
  salaryFrom: FieldError<number>;
  salaryTo: FieldError<number>;
  isSalaryMonthly: FieldError<boolean>;
  hasVisaSponsorship: FieldError<boolean>;
  education: FieldError<string>;
  positionOverview: FieldError<string>;
  locations: FieldError<string>;
  qualifications: FieldError<string>;
  responsibilities: FieldError<string>;
};
