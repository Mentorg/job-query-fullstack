import { Location } from "./location";

export type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  language: string;
  location: Location;
  timezone: string;
  mfa: boolean;
  avatar: string;
  recruiter: Recruiter | boolean;
  createdAt: string;
  locationId?: number;
  currencyId?: number;
};

type Recruiter = {
  expertise: string;
  description: string;
  id?: number;
  user?: User;
  userId?: number;
};

type RecruiterErrors = {
  expertise: boolean | string | undefined;
  description: boolean | string | undefined;
};

export type CreateRecruiter = {
  name: string;
  role: string;
  email: string;
  password: string;
  password_confirmation: string;
  companies: number;
};

export type CreateRecruiterErrors = {
  name: boolean | string | undefined;
  role: boolean | string | undefined;
  email: boolean | string | undefined;
  password: boolean | string | undefined;
  password_confirmation: boolean | string | undefined;
  companies: boolean | string | undefined;
};

export type Applicant = {
  id: number;
  resume: string;
  skills: string;
  languages: string;
  note: string;
  user_id: number;
};

export type PasswordUpdateFields = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export type PasswordUpdateFieldsErrors = {
  current_password: boolean | string | undefined;
  new_password: boolean | string | undefined;
  new_password_confirmation: boolean | string | undefined;
};

type UserErrors = {
  avatar: string | boolean;
  name: string | boolean | undefined;
  phone: string | boolean | undefined;
  linkedinProfile: string | boolean | undefined;
  locationId: string | boolean | undefined;
};

export type LocaleErrors = {
  language: string | boolean | undefined;
  timezone: string | boolean | undefined;
  currencyId: string | boolean | undefined;
};
