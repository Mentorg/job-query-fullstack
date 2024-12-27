import { useLocation } from "react-router-dom";
import Hero from "../layouts/Hero";
import Job from "../components/JobAdvertisement";
import { useSearchResultsService } from "../hooks/useSearchResultsService";

function SearchResults() {
  const location = useLocation();
  const searchTitle = location.state;
  const { searchValue } = useSearchResultsService(searchTitle);

  return (
    <>
      <Hero />
      <section className="h-full bg-slate-100 py-10">
        <div className="container mx-auto px-4">
          {searchValue.length > 0 ? (
            <>
              {searchValue.map((job) => (
                <Job key={job.id} job={job} />
              ))}
            </>
          ) : (
            <div className="flex h-full flex-col items-center">
              <h2 className="text-2xl">
                The search <span className="font-semibold">{searchTitle}</span>{" "}
                did not match any jobs.
              </h2>
              <p className="mt-8 font-semibold">Search suggestions</p>
              <ul className="mt-4">
                <li className="list-inside list-disc">
                  Try more general keywords
                </li>
                <li className="list-inside list-disc">Check your spelling</li>
                <li className="list-inside list-disc">
                  Replace abbreviations with the entire word
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchResults;
