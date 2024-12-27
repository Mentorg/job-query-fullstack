import { Ability } from "./ability";
import { Education } from "./education";
import { Experience } from "./experience";
import { Job } from "./job";
import { User } from "./user";

type DetailedApplicant = {
  educations: Education[];
  experiences: Experience[];
  id: number;
  languages: Ability[];
  skills: Ability[];
  user: User;
  user_id: number;
};

export type DetailedApplication = {
  applicant: DetailedApplicant;
  applicantId: number;
  createdAt: string;
  id: number;
  job: Job;
  note: string;
  resume: string;
  status: string;
  updatedAt: string;
};
