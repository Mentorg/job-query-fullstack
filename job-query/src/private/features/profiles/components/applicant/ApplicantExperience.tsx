import { FaLocationDot } from "react-icons/fa6";
import { LuPenLine } from "react-icons/lu";
import { BiTrash } from "react-icons/bi";
import Chip from "../../../../../shared/components/ui/Chip";
import Modal from "../../../../context/Modal";
import Menus from "../../../../context/Menus";
import ConfirmDelete from "../../../../components/ConfirmDelete";
import EditExperience from "./EditExperience";
import { formatDate } from "../../../../../shared/utils/dateFormat";
import { useDeleteExperience } from "../../hooks/useDeleteEdxperience";
import { Experience } from "../../../../../shared/types/experience";

type ApplicantExperienceProps = {
  resource: Experience;
};

function ApplicantExperience({ resource }: ApplicantExperienceProps) {
  const { handleDelete } = useDeleteExperience(resource);

  return (
    <>
      <div
        key={resource.id}
        className="mb-10 flex flex-col items-center gap-4 rounded-md border border-slate-300 px-5 py-6 sm:grid sm:grid-cols-[auto_auto_1fr] sm:grid-rows-[auto_1f_1fr_auto_auto] xl:grid-cols-[auto_1fr_0.75fr_0.5fr_auto] xl:grid-rows-1"
      >
        <div className="h-fit w-fit place-self-center rounded-full border p-4 sm:col-start-1 sm:col-end-1 sm:place-self-start">
          <img
            src="../../../../../../public/experience.png"
            alt="Work experience company icon"
          />
        </div>
        <div className="flex flex-col text-center sm:text-left">
          <p className="text-lg font-semibold">{resource.title}</p>
          <p className="text-sm font-medium text-slate-400">
            {resource.company}
          </p>
        </div>
        <div className="flex flex-col text-center sm:text-right xl:text-left">
          <p className="text-sm font-medium text-slate-400">Date</p>
          <p className="text-base font-medium md:text-lg">
            {formatDate(resource.dateStart)} - {formatDate(resource.dateEnd)}
          </p>
        </div>
        <div className="flex sm:col-start-2 xl:col-start-4 xl:justify-center">
          <Chip
            className="flex h-fit w-fit items-center rounded-3xl bg-blue-500 px-3 py-1"
            icon={<FaLocationDot className="text-white" />}
          >
            {resource.location.city}, {resource.location.code}
          </Chip>
        </div>
        <div className="flex gap-2.5 sm:col-start-3 sm:justify-end xl:col-start-5">
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
              <EditExperience experience={resource} onCloseModal={close} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={resource.title}
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

export default ApplicantExperience;
