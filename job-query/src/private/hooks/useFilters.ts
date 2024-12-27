import { useState } from "react";

function useFilters() {
  const [gridView, setGridView] = useState<boolean>(true);
  const [sort, setSort] = useState<string>("date-asc");

  const applicationFilter = {
    "date-desc": "Date: Desc",
    "date-asc": "Date: Asc",
    "status-interview": "Status: Interview",
    "status-on-hold": "Status: On Hold",
    "status-shortlisted": "Status: Shortlisted",
    "status-rejected": "Status: Rejected",
  };

  const jobFilter = {
    "date-desc": "Date: Desc",
    "date-asc": "Date: Asc",
    "title-asc": "Title: Asc",
    "title-desc": "Title: Desc",
    "status-filled": "Status: Filled",
    "status-open": "Status: Open",
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
