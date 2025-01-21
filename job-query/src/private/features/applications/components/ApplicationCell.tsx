import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiEye } from "react-icons/hi2";
import { RiMessage2Line } from "react-icons/ri";
import { LuClipboardList, LuClipboardX } from "react-icons/lu";
import { MdEditNote } from "react-icons/md";
import Modal from "../../../context/Modal";
import Menus from "../../../context/Menus";
import ApplicationDetails from "./ApplicationDetails";
import StatusChip from "../../../components/StatusChip";
import ApplicationNoteForm from "./ApplicationNoteForm";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { formatDate } from "../../../../shared/utils/dateFormat";
import { DetailedApplication } from "../../../../shared/types/application";

type ApplicationCellProps = {
  application: DetailedApplication;
};

function ApplicationCell({ application }: ApplicationCellProps) {
  const navigate = useNavigate();
  const { updateStatus } = useUpdateApplicationStatus(application);
  const { t } = useTranslation();

  const avatarUrl = application.applicant.user?.avatar
    ? `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${application.applicant.user?.avatar}`
    : `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-avatar.png`;

  return (
    <div
      key={application?.id}
      className="flex rounded-md border-2 border-slate-100 p-4"
    >
      <div className="w-[90%]">
        <div className="flex">
          <img
            src={avatarUrl}
            alt={`${application.applicant.user?.name}'s avatar`}
          />
          <div className="ml-4 flex min-w-0 flex-col justify-center">
            <h2 className="text-lg font-semibold">
              {application.applicant.user?.name}
            </h2>
            <p className="truncate text-sm text-slate-500">
              {application.applicant.user?.email}
            </p>
          </div>
        </div>
        <div className="my-4 flex justify-between">
          <h3 className="mr-4 flex flex-col text-sm font-medium text-slate-500">
            {t("application.appliedFor")}
            <span className="line-clamp-1 text-base font-medium text-primary">
              {application.job.title}
            </span>
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="flex flex-row items-baseline text-sm">
            {t("application.date")}
            <span className="ml-2 font-medium text-slate-500">
              {formatDate(application.createdAt)}
            </span>
          </p>
          <StatusChip>{application?.status}</StatusChip>
        </div>
      </div>
      <div className="w-[10%]">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={application.id.toString()} />
            <Menus.List id={application.id.toString()}>
              <Modal.Open opens="view">
                <Menus.Button type="option">
                  <HiEye />
                  <span>{t("contextAction.viewDetails")}</span>
                </Menus.Button>
              </Modal.Open>
              <Menus.Button
                type="option"
                onClick={() => navigate("/dashboard/messages/newMessage")}
              >
                <RiMessage2Line />
                <span>{t("contextAction.contact")}</span>
              </Menus.Button>
              <Menus.Button
                type="option"
                onClick={() => updateStatus("interview")}
              >
                <LuClipboardList />
                <span>{t("contextAction.statusInterview")}</span>
              </Menus.Button>
              <Menus.Button
                type="option"
                onClick={() => updateStatus("on-hold")}
              >
                <LuClipboardX />
                <span>{t("contextAction.statusOnHold")}</span>
              </Menus.Button>
              <Menus.Button
                type="option"
                onClick={() => updateStatus("shortlisted")}
              >
                <LuClipboardList />
                <span>{t("contextAction.statusShortlisted")}</span>
              </Menus.Button>
              <Menus.Button
                type="option"
                onClick={() => updateStatus("rejected")}
              >
                <LuClipboardX />
                <span>{t("contextAction.statusRejected")}</span>
              </Menus.Button>
              <Modal.Open opens="addNote">
                <Menus.Button type="option">
                  <MdEditNote />
                  <span>{t("contextAction.updateNote")}</span>
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="view">
              <ApplicationDetails application={application} />
            </Modal.Window>
            <Modal.Window name="addNote">
              <ApplicationNoteForm
                application={application}
                onCloseModal={close}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </div>
  );
}

export default ApplicationCell;
