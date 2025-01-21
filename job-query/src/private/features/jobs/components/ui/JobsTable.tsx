import Table from "../../../../context/Table";
import Menus from "../../../../context/Menus";
import JobRow from "./JobRow";
import { Job } from "../../../../../shared/types/job";
import { useTranslation } from "react-i18next";

type JobsTable = {
  jobs: Job[];
};

function JobsTable({ jobs }: JobsTable) {
  const { t } = useTranslation();
  return (
    <Menus>
      <Table tableType="jobs">
        <Table.Header>
          <p className="flex items-center justify-between">#</p>
          <p className="flex w-[150px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {t("table.title")}
          </p>
          <p className="flex w-[150px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {t("table.type")}
          </p>
          <p className="flex w-[150px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {t("table.location")}
          </p>
          <p className="flex w-[150px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {t("table.datePosted")}
          </p>
          <p className="flex w-[150px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {t("table.applicants")}
          </p>
          <p className="flex w-[150px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {t("table.status")}
          </p>
          <div>&nbsp;</div>
        </Table.Header>
        <Table.Body
          data={jobs as Job[]}
          render={(job: Job) => <JobRow job={job} key={job.id} />}
        />
      </Table>
    </Menus>
  );
}

export default JobsTable;
