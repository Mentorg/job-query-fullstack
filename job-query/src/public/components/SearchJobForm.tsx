import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useSearchJobFormService } from "../hooks/useSearchJobFormService";
import Button from "../../shared/components/ui/Button";
import { useTranslation } from "react-i18next";

function SearchJobForm() {
  const { search } = useSearchJobFormService();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(searchQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="mt-5 flex w-full justify-center gap-y-4 space-x-4 px-4 md:flex-row"
    >
      <input
        type="search"
        id="search"
        name="search"
        onChange={handleChange}
        placeholder={t("placeholder.searchInput")}
        className="h-auto w-fit truncate rounded-md border-2 border-slate-400 px-6 text-base lg:w-96 "
        aria-label="Search for jobs"
      />
      <Button className="flex h-auto w-fit items-center rounded-md bg-primary px-8 text-base text-white transition-all hover:bg-primary/75">
        <IoSearchSharp className="h-10 w-10 p-2 md:h-5 md:w-5 md:p-0" />
        <span className="ml-2 hidden md:flex">{t("button.search")}</span>
      </Button>
    </form>
  );
}

export default SearchJobForm;
