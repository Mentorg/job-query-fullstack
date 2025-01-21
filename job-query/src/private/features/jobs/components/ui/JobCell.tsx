import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HiEye, HiMiniUserGroup, HiPencil, HiTrash } from "react-icons/hi2";
import { LuClipboardList, LuClipboardX } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import Modal from "../../../../context/Modal";
import Menus from "../../../../context/Menus";
import JobDetails from "./JobDetails";
import JobEdit from "../form/JobEdit";
import ConfirmDelete from "../../../../components/ConfirmDelete";
import StatusChip from "../../../../components/StatusChip";
import Chip from "../../../../../shared/components/ui/Chip";
import { useAuth } from "../../../../../shared/context/AuthContext";
import { useDeleteJob } from "../../hooks/useDeleteJob";
import { useUpdateJobStatus } from "../../hooks/useUpdateJobStatus";
import {
  formatDate,
  formatDeadline,
} from "../../../../../shared/utils/dateFormat";
import { Job, UpdateJob } from "../../../../../shared/types/job";
import { Location } from "../../../../../shared/types/location";

type JobProps = {
  job: Job;
};

function JobCell({ job }: JobProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { updateStatus } = useUpdateJobStatus(job);
  const { handleDelete } = useDeleteJob(job.id);
  const { t } = useTranslation();

  const companyUrl = job.company.avatar
    ? `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/${job.company.avatar}`
    : `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/default-logo.svg`;

  return (
    <div key={job.id} className="flex rounded-md border-2 border-slate-100 p-4">
      <div className="flex w-[90%] flex-col gap-y-6">
        <div className="flex">
          <img
            src={companyUrl}
            alt={`${job.company.name}'s logo`}
            className="w-[3rem] rounded-full"
          />
          <div className="ml-4 flex flex-col justify-center">
            <h2 className="line-clamp-1 font-semibold">{job.title}</h2>
            <p className="line-clamp-1 text-xs font-medium text-slate-500 sm:text-sm">
              {job.company.name}
            </p>
          </div>
        </div>
        <div>
          <p className="flex flex-row items-baseline text-sm">
            {t("job.posted")}:
            <span className="ml-2 font-medium text-slate-500">
              {formatDate(job.createdAt)}
            </span>
          </p>
          <p className="flex flex-row items-baseline text-sm">
            {t("job.deadline")}:
            <span className="ml-2 font-medium text-red-500">
              {formatDeadline(job.deadline)}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <StatusChip>{job.status}</StatusChip>
          {job.locations.length > 1 ? (
            <Chip
              icon={<FaLocationDot className="text-white" />}
              className="flex h-fit items-center rounded-3xl bg-blue-500 px-3 py-1"
            >
              {t("job.multipleLocations")}
            </Chip>
          ) : (
            job.locations.map((record: Location | number) => {
              if (typeof record === "object") {
                return (
                  <Chip
                    icon={<FaLocationDot className="text-white" />}
                    key={record.id}
                    className="flex h-fit items-center rounded-3xl bg-blue-500 px-3 py-1"
                  >
                    {record.city}, {record.code}
                  </Chip>
                );
              } else {
                return (
                  <Chip
                    icon={<FaLocationDot className="text-white" />}
                    key={record}
                    className="flex h-fit items-center rounded-3xl bg-blue-500 px-3 py-1"
                  >
                    {t("job.location")} {record}
                  </Chip>
                );
              }
            })
          )}
          <p className="flex items-center text-base font-semibold leading-3">
            <HiMiniUserGroup className="h-[1rem] w-[1rem] text-primary" />
            <span className="ml-1">{job.applicants}</span>
          </p>
        </div>
      </div>
      <div className="w-[10%]">
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
      </div>
    </div>
  );
}

export default JobCell;
