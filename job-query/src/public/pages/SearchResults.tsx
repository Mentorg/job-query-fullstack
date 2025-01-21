import { useLocation } from "react-router-dom";
import Hero from "../layouts/Hero";
import Job from "../components/JobAdvertisement";
import { useSearchResultsService } from "../hooks/useSearchResultsService";
import { Trans, useTranslation } from "react-i18next";

function SearchResults() {
  const location = useLocation();
  const searchTitle = location.state;
  const { searchValue } = useSearchResultsService(searchTitle);
  const { t } = useTranslation();

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
                <Trans
                  i18nKey="searchPage.searchNoMatch"
                  values={{ searchTitle }}
                  components={{ span: <span className="font-semibold" /> }}
                />
              </h2>
              <h3 className="mt-8 font-semibold">{t("searchPage.title")}</h3>
              <ul className="mt-4">
                <li className="list-inside list-disc">
                  {t("searchPage.generalKeywordsSuggestion")}
                </li>
                <li className="list-inside list-disc">
                  {t("searchPage.checkSpelling")}
                </li>
                <li className="list-inside list-disc">
                  {t("searchPage.fullWordSuggestion")}
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
