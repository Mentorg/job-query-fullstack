import { LuPenLine } from "react-icons/lu";
import { BiTrash } from "react-icons/bi";
import Modal from "../../../../context/Modal";
import Menus from "../../../../context/Menus";
import ConfirmDelete from "../../../../components/ConfirmDelete";
import EditEducation from "./EditEducation";
import { useDeleteEducation } from "../../hooks/useDeleteEducation";
import { Education } from "../../../../../shared/types/education";
import { formatDate } from "../../../../../shared/utils/dateFormat";

type ApplicantEducationProps = {
  resource: Education;
};

function ApplicantEducation({ resource }: ApplicantEducationProps) {
  const { handleDelete } = useDeleteEducation(resource);

  return (
    <>
      <div
        key={resource.id}
        className="mb-10 grid grid-cols-2 grid-rows-[auto_1fr_auto_auto_auto_auto] items-center gap-4 rounded-md border border-slate-300 px-5 py-6 sm:grid-cols-[auto_1fr_1fr] sm:grid-rows-[1fr_1fr_auto] lg:grid-cols-[auto_1fr_auto] lg:grid-rows-2 xl:grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] xl:grid-rows-1"
      >
        <div className="col-start-1 col-end-3 flex w-fit place-self-center rounded-full border p-4 sm:col-end-1 sm:place-self-start">
          <img
            src="../../../../../../public/education.png"
            alt="Education institute icon"
          />
        </div>
        <div className="col-start-1 col-end-3 row-start-2 row-end-2 flex flex-col text-center sm:col-start-2 sm:col-end-4 sm:row-start-1 sm:text-left lg:col-end-3 xl:col-start-2 xl:col-end-2">
          <p className="font-semibold">{resource.degree}</p>
          <p className="text-xs font-medium text-slate-400">
            {resource.department} - {resource.university}
          </p>
        </div>
        <div className="order-1 row-start-3 flex flex-col items-center self-baseline sm:order-2 sm:row-start-2 lg:col-start-3 lg:row-start-1 lg:place-self-center xl:col-start-3 xl:col-end-3">
          <p className="text-xs font-medium text-slate-400">Date</p>
          <p className="font-medium">
            {formatDate(resource.dateStart)} - {formatDate(resource.dateEnd)}
          </p>
        </div>
        <div className="order-2 row-start-3 flex flex-col items-center self-baseline sm:order-1 sm:row-start-2 lg:place-self-center xl:order-2 xl:col-start-4 xl:col-end-4 xl:row-start-1">
          <p className="text-xs font-medium text-slate-400">GPA</p>
          <p className="font-medium">{resource.gpa}</p>
        </div>
        <div className="col-start-1 col-end-3 row-start-4 self-baseline text-center sm:col-start-3 sm:row-start-2 lg:col-start-2 lg:place-self-center xl:col-start-5 xl:col-end-5 xl:row-start-1">
          <p className="text-xs font-medium text-slate-400">Honors</p>
          <p className="font-medium">{resource.honors}</p>
        </div>
        <div className="col-start-1 col-end-3 row-start-5 flex justify-center gap-2.5 place-self-center sm:col-end-4 sm:row-start-3 sm:justify-end lg:col-start-3 lg:row-start-2 xl:col-start-6 xl:col-end-6 xl:row-start-1 xl:justify-self-end">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                Edit
                <span className="ml-2">
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button type="delete">
                Delete
                <span className="ml-2">
                  <BiTrash />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <EditEducation education={resource} onCloseModal={close} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={resource.degree}
                onConfirm={handleDelete}
                onCloseModal={close}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default ApplicantEducation;
