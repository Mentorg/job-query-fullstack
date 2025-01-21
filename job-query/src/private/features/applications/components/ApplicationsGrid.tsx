import { useTranslation } from "react-i18next";
import ApplicationCell from "./ApplicationCell";
import Menus from "../../../context/Menus";
import { DetailedApplication } from "../../../../shared/types/application";

type ApplicationsGridProps = {
  applications: DetailedApplication[];
  sort: string;
};

function ApplicationsGrid({ applications, sort }: ApplicationsGridProps) {
  const { t } = useTranslation();

  const sortedApplications = [...applications].sort((a, b) => {
    switch (sort) {
      case "date-desc":
        return b.createdAt.localeCompare(a.createdAt);
      case "date-asc":
        return a.createdAt.localeCompare(b.createdAt);
      case "status-interview":
        return a.status === "interview" ? -1 : b.status === "interview" ? 1 : 0;
      case "status-on-hold":
        return a.status === "on-hold" ? -1 : b.status === "on-hold" ? 1 : 0;
      case "status-shortlisted":
        return a.status === "shortlisted"
          ? -1
          : b.status === "shortlisted"
            ? 1
            : 0;
      case "status-rejected":
        return a.status === "rejected" ? -1 : b.status === "rejected" ? 1 : 0;
      default:
        return 0;
    }
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <Menus>
        {sortedApplications.length > 0 ? (
          sortedApplications.map((application) => (
            <ApplicationCell application={application} key={application.id} />
          ))
        ) : (
          <h2>{t("application.noApplications")}</h2>
        )}
      </Menus>
    </div>
  );
}

export default ApplicationsGrid;
