import { useNavigate } from "react-router-dom";
import { HiEye } from "react-icons/hi2";
import { RiMessage2Line } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { LuClipboardList, LuClipboardX } from "react-icons/lu";
import Table from "../../../context/Table";
import Modal from "../../../context/Modal";
import Menus from "../../../context/Menus";
import StatusChip from "../../../components/StatusChip";
import ApplicationDetails from "./ApplicationDetails";
import ApplicationNoteForm from "./ApplicationNoteForm";
import { formatDate } from "../../../../shared/utils/dateFormat";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { DetailedApplication } from "../../../../shared/types/application";
import { useTranslation } from "react-i18next";

type ApplicationRowProps = {
  application: DetailedApplication;
};

function ApplicationRow({ application }: ApplicationRowProps) {
  const { updateStatus } = useUpdateApplicationStatus(application);
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Table.Row>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {application?.id}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {application?.applicant.user.name}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {application?.applicant.user.email}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {application?.job.title}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {formatDate(application.createdAt)}
        </p>
      </div>
      <div>
        <StatusChip>{application?.status}</StatusChip>
      </div>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={application.id?.toString()} />
          <Menus.List id={application.id.toString()}>
            <Modal.Open opens="read">
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
            <Menus.Button type="option" onClick={() => updateStatus("on-hold")}>
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
          <Modal.Window name="read">
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
    </Table.Row>
  );
}

export default ApplicationRow;
