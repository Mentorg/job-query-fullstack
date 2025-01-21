import { useTranslation } from "react-i18next";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import Menus from "../../../../context/Menus";
import Modal from "../../../../context/Modal";
import Table from "../../../../context/Table";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import ConfirmDelete from "../../../../components/ConfirmDelete";
import StatusChip from "../../../../components/StatusChip";
import { useDeleteUser } from "../../../settings/hooks/useDeleteUser";
import { formatDate } from "../../../../../shared/utils/dateFormat";
import { User } from "../../../../../shared/types/user";

type UserRowProps = {
  user: User;
};

function UserRow({ user }: UserRowProps) {
  const { handleDelete } = useDeleteUser(user.id);
  const { t } = useTranslation();

  return (
    <Table.Row key={user?.id}>
      <div>
        <p className="w-[150px] whitespace-nowrap text-sm font-semibold text-slate-600">
          {user?.id}
        </p>
      </div>
      <div>
        <p className="w-[150px] whitespace-nowrap text-sm font-semibold text-slate-600">
          {user?.name}
        </p>
      </div>
      <div>
        <p className="w-[150px] whitespace-nowrap text-sm font-semibold text-slate-600">
          <StatusChip>{user.role}</StatusChip>
        </p>
      </div>
      <div>
        <p className="w-[150px] whitespace-nowrap text-sm font-semibold text-slate-600">
          {user?.email}
        </p>
      </div>
      <div>
        <p className="w-[150px] whitespace-nowrap text-sm font-semibold text-slate-600">
          {formatDate(user?.createdAt)}
        </p>
      </div>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={user.id.toString()} />
          <Menus.List id={user.id.toString()}>
            <Modal.Open opens="view">
              <Menus.Button type="option">
                <HiEye />
                <span>{t("contextAction.viewUser")}</span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="edit">
              <Menus.Button type="option">
                <HiPencil />
                <span>{t("contextAction.edit")}</span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button type="option">
                <HiTrash />
                <span>{t("contextAction.delete")}</span>
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="view">
            <UserDetails resource={user} />
          </Modal.Window>
          <Modal.Window name="edit">
            <UserForm profile={user} onCloseModal={close} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={user.name}
              onConfirm={handleDelete}
              onCloseModal={close}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default UserRow;
