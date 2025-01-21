import { useTranslation } from "react-i18next";
import { PiArrowsDownUp } from "react-icons/pi";
import Menus from "../../../context/Menus";
import ApplicationRow from "./ApplicationRow";
import Table from "../../../context/Table";
import { DetailedApplication } from "../../../../shared/types/application";

type ApplicationsTableProps = {
  applications: DetailedApplication[];
};

function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const { t } = useTranslation();

  return (
    <Menus>
      <Table tableType="applications">
        <Table.Header>
          <p className="flex items-center justify-between">
            #
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.name")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.email")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.position")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.date")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.status")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <div>&nbsp;</div>
        </Table.Header>
        <Table.Body
          data={applications as DetailedApplication[]}
          render={(application: DetailedApplication) => (
            <ApplicationRow key={application.id} application={application} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ApplicationsTable;
