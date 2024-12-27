import { useMemo } from "react";
import { useGetJobs } from "./useGetJobs";

type Location = {
  city: string;
  country: string;
  code: string;
  id: number;
};

type Recruiter = {
  company: Company;
};

type Company = {
  name: string;
};

type Job = {
  title: string;
  location: Location[];
  recruiter: Recruiter;
};

export function useSearchResultsService(searchTitle: string) {
  const { jobs } = useGetJobs();
  const searchValue = useMemo(() => {
    if (!Array.isArray(jobs)) {
      return [];
    }
    const filteredJobs = jobs.filter((job: Job) => {
      const { title, location } = job;

      const city = location.map((record) => record.city).toString();
      const company = job.recruiter.company.name;

      const normalizedPositionTitle = title.toLowerCase();
      const normalizedLocation = city.toLowerCase();
      const normalizedCompanyName = company.toLowerCase();

      const normalizedSearch = searchTitle?.toLowerCase();

      return (
        normalizedPositionTitle.includes(normalizedSearch) ||
        normalizedLocation.includes(normalizedSearch) ||
        normalizedCompanyName.includes(normalizedSearch)
      );
    });

    return filteredJobs;
  }, [searchTitle, jobs]);

  return { searchValue };
}
