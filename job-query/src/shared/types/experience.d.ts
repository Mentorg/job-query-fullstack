import { Location } from "./location";

export type Experience = {
  id: number;
  company: string;
  title: string;
  location: Location;
  locationId?: number;
  dateStart: string;
  dateEnd: string;
  applicantId: number;
};

export type CreateExperience = {
  company: string;
  title: string;
  dateStart: string;
  dateEnd: string;
  locationId: number;
};

export type UpdateExperience = {
  id: number;
  company: string;
  title: string;
  locationId: number;
  dateStart: string;
  dateEnd: string;
  applicantId: number;
};

export type CreateExperienceErrors = {
  company: boolean | string;
  title: boolean | string;
  dateStart: boolean | string;
  dateEnd: boolean | string;
  locationId: boolean | string;
};

export type UpdateExperienceErrors = {
  company: boolean | string;
  title: boolean | string;
  locationId: boolean | string;
  dateStart: boolean | string;
  dateEnd: boolean | string;
};
