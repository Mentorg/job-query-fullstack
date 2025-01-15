import { useMemo } from "react";
import { useGetJobs } from "./useGetJobs";
import { Company } from "../../shared/types/company";
import { Location } from "../../shared/types/location";

type Job = {
  title: string;
  locations: Location[];
  recruiter: { company: Company };
  company: { name: string };
};

export function useSearchResultsService(searchTitle: string) {
  const { jobs } = useGetJobs();
  const searchValue = useMemo(() => {
    if (!Array.isArray(jobs)) {
      return [];
    }
    const filteredJobs = jobs.filter((job: Job) => {
      const { title, locations } = job;
      const city = locations.map((record: Location) => record.city).toString();
      const company = job.company.name;

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
