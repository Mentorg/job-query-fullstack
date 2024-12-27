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

type ApplicationRowProps = {
  application: DetailedApplication;
};

function ApplicationRow({ application }: ApplicationRowProps) {
  const { updateStatus } = useUpdateApplicationStatus(application);
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
                <span>See Details</span>
              </Menus.Button>
            </Modal.Open>
            <Menus.Button
              type="option"
              onClick={() => navigate("/dashboard/messages/newMessage")}
            >
              <RiMessage2Line />
              <span>Contact</span>
            </Menus.Button>
            <Menus.Button
              type="option"
              onClick={() => updateStatus("interview")}
            >
              <LuClipboardList />
              <span>Mark as Interview</span>
            </Menus.Button>
            <Menus.Button type="option" onClick={() => updateStatus("on-hold")}>
              <LuClipboardX />
              <span>Mark as On Hold</span>
            </Menus.Button>
            <Menus.Button
              type="option"
              onClick={() => updateStatus("shortlisted")}
            >
              <LuClipboardList />
              <span>Mark as Shortlisted</span>
            </Menus.Button>
            <Menus.Button
              type="option"
              onClick={() => updateStatus("rejected")}
            >
              <LuClipboardX />
              <span>Mark as Rejected</span>
            </Menus.Button>
            <Modal.Open opens="addNote">
              <Menus.Button type="option">
                <MdEditNote />
                <span>Update Note</span>
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
