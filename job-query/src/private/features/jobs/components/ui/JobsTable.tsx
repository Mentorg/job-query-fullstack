import Table from "../../../../context/Table";
import Menus from "../../../../context/Menus";
import JobRow from "./JobRow";
import { Job } from "../../../../../shared/types/job";

type JobsTable = {
  jobs: Job[];
};

function JobsTable({ jobs }: JobsTable) {
  return (
    <Menus>
      <Table tableType="jobs">
        <Table.Header>
          <p className="flex items-center justify-between">#</p>
          <p className="flex items-center justify-between">Title</p>
          <p className="flex items-center justify-between">Type</p>
          <p className="flex items-center justify-between">Location</p>
          <p className="flex items-center justify-between">Date Posted</p>
          <p className="flex items-center justify-between">Applicants</p>
          <p className="flex items-center justify-between">Status</p>
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
