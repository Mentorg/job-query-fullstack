import { useState } from "react";
import { useTranslation } from "react-i18next";

function useFilters() {
  const [gridView, setGridView] = useState<boolean>(true);
  const [sort, setSort] = useState<string>("date-asc");
  const { t } = useTranslation();

  const applicationFilter = {
    "date-desc": t("filter.dateDesc"),
    "date-asc": t("filter.dateAsc"),
    "status-interview": t("filter.statusInterview"),
    "status-on-hold": t("filter.statusOnHold"),
    "status-shortlisted": t("filter.statusShortlisted"),
    "status-rejected": t("filter.statusRejected"),
  };

  const jobFilter = {
    "date-desc": t("filter.dateDesc"),
    "date-asc": t("filter.dateAsc"),
    "title-asc": t("filter.titleAsc"),
    "title-desc": t("filter.titleDesc"),
    "status-filled": t("filter.statusFilled"),
    "status-open": t("filter.statusOpen"),
  };

  function handleOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value);
  }

  function handleGridView() {
    setGridView(!gridView);
  }

  return {
    gridView,
    sort,
    applicationFilter,
    jobFilter,
    handleOrder,
    handleGridView,
  };
}

export { useFilters };
