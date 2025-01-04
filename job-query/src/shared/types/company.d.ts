import { Location } from "./location";

export type Company = {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  website: string;
  avatar: string;
  slug: string;
  locations: Location[];
  createdAt: string;
};

export type CreateCompany = {
  name: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  website: string;
  avatar: string;
  slug: string;
  locations: Location[] | number[];
};

export type UpdateCompany = {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  website: string;
  slug: string;
  avatar: string;
  locations: Location[] | number[];
};

type CompanyErrors = {
  name: boolean | string;
  email: boolean | string;
  description: boolean | string;
  address: boolean | string;
  locations: boolean | string;
  phone: boolean | string;
  website: boolean | string;
  slug: boolean | string;
  avatar: boolean | string;
  facebook: boolean | string;
  linkedin: boolean | string;
  twitter: boolean | string;
};

type CreateCompanyErrors = {
  name: boolean | string;
  email: boolean | string;
  description: boolean | string;
  address: boolean | string;
  facebook: boolean | string;
  linkedin: boolean | string;
  twitter: boolean | string;
  locations: boolean | string;
  phone: boolean | string;
  website: boolean | string;
  slug: boolean | string;
  avatar: boolean | string;
};
