import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const languageMap: Record<string, string> = {
    "en-US": "English",
    de: "German",
    fr: "French",
  };

  const languageName =
    user?.language && languageMap[user.language]
      ? languageMap[user.language]
      : user?.language;

  return (
    <div className="mt-10 w-full xl:w-[75%]">
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">{t("setting.account.email")}</h3>
          <p className="mt-2 text-sm lg:mt-6">
            {t("setting.account.emailDescription")}
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          <p>{user?.email}</p>
        </div>
        <div className="flex flex-[1] justify-end">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                {t("button.edit")}
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
          <h3 className="font-medium">{t("setting.account.password")}</h3>
          <p className="mt-2 text-sm lg:mt-6">
            {t("setting.account.passwordDescription")}
          </p>
        </div>
        <div className="flex flex-[1] justify-end">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                {t("button.updatePassword")}
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
          <h3 className="font-medium">{t("setting.locale.language")}</h3>
          <p className="mt-2 text-sm lg:mt-6">
            {t("setting.locale.languageDescription")}
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          <p>{languageName}</p>
        </div>
        <div className="flex flex-[1] justify-end">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                {t("button.edit")}
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
          <h3 className="font-medium">{t("setting.account.deleteAccount")}</h3>
          <p className="mt-2 text-sm lg:mt-6">
            {t("setting.account.deleteAccountDescription")}
          </p>
        </div>
        <div className="flex flex-[1] justify-end gap-4">
          <Modal>
            <Modal.Open opens="delete">
              <Menus.Button type="delete">
                {t("button.delete")}
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
