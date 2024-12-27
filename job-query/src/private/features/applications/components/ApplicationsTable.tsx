import { PiArrowsDownUp } from "react-icons/pi";
import Menus from "../../../context/Menus";
import ApplicationRow from "./ApplicationRow";
import Table from "../../../context/Table";
import { DetailedApplication } from "../../../../shared/types/application";

type ApplicationsTableProps = {
  applications: DetailedApplication[];
};

function ApplicationsTable({ applications }: ApplicationsTableProps) {
  return (
    <Menus>
      <Table tableType="applications">
        <Table.Header>
          <p className="flex items-center justify-between">
            #
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Name
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Email
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Position
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Date
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Status
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
