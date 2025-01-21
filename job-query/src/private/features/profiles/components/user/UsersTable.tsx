import { useTranslation } from "react-i18next";
import { PiArrowsDownUp } from "react-icons/pi";
import Menus from "../../../../context/Menus";
import Table from "../../../../context/Table";
import UserRow from "./UserRow";
import { User } from "../../../../../shared/types/user";

type UsersTableProps = {
  users: User[];
};

function UsersTable({ users }: UsersTableProps) {
  const { t } = useTranslation();

  return (
    <Menus>
      <Table tableType="users">
        <Table.Header>
          <p className="flex items-center justify-between">
            #
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.name")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.role")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.email")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.created")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
        </Table.Header>
        <Table.Body
          data={users as User[]}
          render={(user: User) => <UserRow key={user.id} user={user} />}
        />
      </Table>
    </Menus>
  );
}

export default UsersTable;
