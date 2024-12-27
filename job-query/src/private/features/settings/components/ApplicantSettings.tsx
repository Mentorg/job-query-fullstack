import { LuPenLine } from "react-icons/lu";
import { BiTrash } from "react-icons/bi";
import Menus from "../../../context/Menus";
import Modal from "../../../context/Modal";
import UpdatePassword from "../../../components/UpdatePassword";
import UpdateLanguage from "../../../components/UpdateLanguage";
import UpdateAccountEmail from "./UpdateAccountEmail";
import ConfirmDelete from "../../../components/ConfirmDelete";
import { useAuth } from "../../../../shared/context/AuthContext";
import { useDeleteUser } from "../hooks/useDeleteUser";

function ApplicantSettings() {
  const { user } = useAuth();
  const { handleDelete } = useDeleteUser(user?.id ?? -1);

  return (
    <div className="mt-10 w-full xl:w-[75%]">
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">Email</h3>
          <p className="mt-2 text-sm lg:mt-6">
            The email address associated with your account
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          <p>{user?.email}</p>
        </div>
        <div className="flex flex-[1] justify-end">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                Edit
                <span>
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdateAccountEmail resource={user} onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">Password</h3>
          <p className="mt-2 text-sm lg:mt-6">
            Set a unique password to protect your account
          </p>
        </div>
        <div className="flex flex-[1] justify-end">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                Change Password
                <span className="ml-2">
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdatePassword onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">Language</h3>
          <p className="mt-2 text-sm lg:mt-6">
            Set the preferred language for the app
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          <p>{user?.language}</p>
        </div>
        <div className="flex flex-[1] justify-end">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                Edit
                <span className="ml-2">
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdateLanguage resource={user} onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">Delete account</h3>
          <p className="mt-2 text-sm lg:mt-6">
            Delete your account and all associated information permanently.
          </p>
        </div>
        <div className="flex flex-[1] justify-end gap-4">
          <Modal>
            <Modal.Open opens="delete">
              <Menus.Button type="delete">
                Delete
                <span className="ml-2">
                  <BiTrash />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={user?.name}
                onConfirm={handleDelete}
                onCloseModal={close}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ApplicantSettings;
