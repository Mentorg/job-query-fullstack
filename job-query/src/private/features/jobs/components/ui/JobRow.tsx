import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { LuClipboardList, LuClipboardX } from "react-icons/lu";
import Table from "../../../../context/Table";
import Modal from "../../../../context/Modal";
import Menus from "../../../../context/Menus";
import ConfirmDelete from "../../../../components/ConfirmDelete";
import JobEdit from "../form/JobEdit";
import StatusChip from "../../../../components/StatusChip";
import JobDetails from "./JobDetails";
import { useAuth } from "../../../../../shared/context/AuthContext";
import { useDeleteJob } from "../../hooks/useDeleteJob";
import { useUpdateJobStatus } from "../../hooks/useUpdateJobStatus";
import { formatDate } from "../../../../../shared/utils/dateFormat";
import { Job, UpdateJob } from "../../../../../shared/types/job";
import { Location } from "../../../../../shared/types/location";

type JobProps = {
  job: Job;
};

function JobRow({ job }: JobProps) {
  const { user } = useAuth();
  const { handleDelete } = useDeleteJob(job.id);
  const { updateStatus } = useUpdateJobStatus(job);
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Table.Row>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {job.id}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {job.title}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {job.isFulltime ? t("job.fullTime") : t("job.partTime")}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {job.locations.map((record: Location | number) => {
            if (typeof record === "object") {
              return record.city;
            } else {
              return record;
            }
          })}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {formatDate(job.createdAt)}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {job.applicants}
        </p>
      </div>
      <div>
        <StatusChip>{job.status}</StatusChip>
      </div>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={job.id.toString()} />
          <Menus.List id={job.id.toString()}>
            {user?.role === "recruiter" || user?.role === "applicant" ? (
              <Menus.Button
                type="option"
                onClick={() =>
                  navigate(
                    `${user?.role === "recruiter" ? "/dashboard" : "/user"}/jobs/${job.id}`,
                  )
                }
              >
                <HiEye />
                <span>{t("contextAction.viewJob")}</span>
              </Menus.Button>
            ) : (
              <Modal.Open opens="view">
                <Menus.Button type="option">
                  <HiEye />
                  <span>{t("contextAction.viewJob")}</span>
                </Menus.Button>
              </Modal.Open>
            )}
            {user?.role === "recruiter" && (
              <>
                {job.status !== "filled" && job.status !== "open" && (
                  <Menus.Button
                    type="option"
                    onClick={() => updateStatus("open")}
                  >
                    <LuClipboardList />
                    <span>{t("contextAction.statusOpen")}</span>
                  </Menus.Button>
                )}
                {job.status !== "filled" && (
                  <Menus.Button
                    type="option"
                    onClick={() => updateStatus("filled")}
                  >
                    <LuClipboardX />
                    <span>{t("contextAction.statusFilled")}</span>
                  </Menus.Button>
                )}
                <Modal.Open opens="edit">
                  <Menus.Button type="option">
                    <HiPencil />
                    <span>{t("contextAction.edit")}</span>
                  </Menus.Button>
                </Modal.Open>
              </>
            )}
            {user?.role !== "applicant" && (
              <Modal.Open opens="delete">
                <Menus.Button type="option">
                  <HiTrash />
                  <span>{t("contextAction.delete")}</span>
                </Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
          <Modal.Window name="view">
            <JobDetails resource={job} />
          </Modal.Window>
          <Modal.Window name="edit">
            <JobEdit job={job as UpdateJob} onCloseModal={close} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={job.title}
              onConfirm={handleDelete}
              onCloseModal={close}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default JobRow;
