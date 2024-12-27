import { useMemo, useState } from "react";
import { Job } from "../../shared/types/job";
import { DetailedApplication } from "../../shared/types/application";
import { Invoice } from "../../shared/types/invoice";

type Item = DetailedApplication | Job | Invoice;

type CommonKeys =
  | "id"
  | "created_at"
  | "status"
  | "name"
  | "email"
  | "title"
  | "is_fulltime"
  | "location"
  | "applicants"
  | "reference"
  | "subscription_id"
  | "annual"
  | "due_date"
  | "amount";

interface SortConfig {
  key: CommonKeys;
  direction: "ascending" | "descending";
}

export const useSortableData = (
  items: Item[],
  config: SortConfig | null = null,
) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        } else {
          return 0;
        }
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: CommonKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort };
};
